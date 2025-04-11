import {
  readdir,
  rmdir,
  stat,
  access,
  mkdir,
  writeFile,
  unlink,
  appendFile,
} from 'fs/promises';
import { join } from 'path';
import XLSX from 'xlsx';

const locales_path = join(process.cwd(), 'src/locales');
const types_path = join(process.cwd(), 'src/locales/types');
const xlsx_path = join(process.cwd(), 'scripts/xlsx');

const langs = ['en-US', 'zh-CN'];

(async function () {
  //记录哪些语言需要记录
  const locales_map = {}; //记录json统一导出
  for (const name of langs) {
    const filePath = join(locales_path, name);
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      locales_map[name] = [];
      const isExists = await folderExists(filePath);
      if (isExists) {
        await deleteFolderRecursive(filePath); //删除auto文件夹
      }

      await mkdir(filePath); //创建文件夹
    }
  }

  //删除常量枚举文件重新创建
  const isExists = await folderExists(types_path);
  if (isExists) {
    await deleteFolderRecursive(types_path); //删除types文件夹
  }
  await mkdir(types_path); //types文件夹

  //先解析xlsx数据
  const xlsx_files = await readdir(xlsx_path);
  if (xlsx_files?.length) {
    for (const name of xlsx_files) {
      outputInfo('开始编译配置表 ===========>', name);
      try {
        const workbook = XLSX.readFile(join(xlsx_path, name));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // 将工作表数据解析为对象数组
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 如果第一行是表头，可以这样处理
        const headers = data[0];
        const objectData = data
          .slice(1)
          .map((row) => {
            const obj = {};
            headers.forEach((header, index) => {
              obj[header] = row[index];
            });
            return obj;
          })
          .filter((info) => {
            return info?.key;
          });

        if (headers?.[0] !== 'key') {
          outputErr(name, '数据配置有误');
          continue;
        }

        const arr = name.split('.');
        arr.pop();
        const file_name = arr.join('.');

        // =======================  处理声明文件 ============================
        const types_str = `export const enum TRAN_${file_name.toLocaleUpperCase()} {
  ${objectData
    .map((item, idx) => {
      if (idx === 0) {
        return `/** ${item.notes} */
  ${replaceAllKey(item.key)} = '${item.key}',`;
      } else {
        return `
  /** ${item.notes} */
  ${replaceAllKey(item.key)} = '${item.key}',`;
      }
    })
    .join('')}          
}
        `;

        //创建声明文件
        await writeFile(
          join(types_path, file_name + '.types.ts'),
          types_str,
          'utf-8',
        );

        // =======================  处理json文件 ============================

        for (const lng in locales_map) {
          // ====================== json ======================

          const data_list = objectData
            .filter((item) => {
              return item?.key && item[lng];
            })
            .map((item) => ({ key: item.key, value: item[lng] }));

          if (data_list.length) {
            const json_str = `{
  ${data_list
    .map((item, idx) => {
      if (idx === 0) {
        return `"${item.key}": "${replaceAllValue(item.value)}"`;
      } else {
        return `  "${item.key}": "${replaceAllValue(item.value)}"`;
      }
    })
    .join(',\n')}             
}`;
            await writeFile(
              join(locales_path, lng, file_name + '.json'),
              json_str,
              'utf-8',
            );
            locales_map[lng]?.push(file_name);
          }
        }

        outputSucc('配置表编译成功 ===========》', name);
      } catch (error) {
        outputErr('配置表编译失败 ===========》', name, error);
      }
    }
  }
})();

async function folderExists(folderPath) {
  try {
    await access(folderPath);
    return true;
  } catch (err) {
    return false;
  }
}

async function deleteFolderRecursive(folderPath) {
  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      const filePath = join(folderPath, file);
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        await deleteFolderRecursive(filePath);
      } else {
        await unlink(filePath);
      }
    }

    await rmdir(folderPath);
  } catch (err) {
    outputErr('Error deleting folder:', err);
  }
}

export function outputErr(...args) {
  for (let i = 0; i < args.length; i++) {
    args[i] = red(args[i]);
  }
  console.log.apply(console, args);
}

export function outputInfo(...args) {
  for (let i = 0; i < args.length; i++) {
    args[i] = skyBlue(args[i]);
  }
  console.log.apply(console, args);
}

export function outputSucc(...args) {
  for (let i = 0; i < args.length; i++) {
    args[i] = green(args[i]);
  }
  console.log.apply(console, args);
}

export function red(str) {
  // 添加 ANSI 转义字符，以将文本输出为红色
  // return `\x1b[31m${str}\x1b[0m`;
  return '\u001B[31m' + str + '\u001B[0m';
}

export function skyBlue(str) {
  return '\u001B[1;36m' + str + '\u001B[0m';
}

export function green(str) {
  return '\u001B[32m' + str + '\u001B[0m';
}

export function replaceAllKey(str) {
  if (!str) return '';
  let newStr = str.replace(new RegExp(' ', 'g'), '_');
  newStr = newStr.replace(new RegExp('-', 'g'), '_');
  return newStr;
}

export function replaceAllValue(str) {
  if (!str) return '';
  let newStr = str.replace(new RegExp('"', 'g'), '\\"');
  return newStr;
}