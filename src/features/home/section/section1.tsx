'use client'
import { Carousel } from "antd";
import Video from 'next-video';

const list = [
  {
    poster: 'https://resource.teld.cn/teldimage/107/teld-official-index-beta-04.jpg',
    url: 'https://resource.teld.cn/telddoc/107/teld-official-index-beta-04.mp4',
  },
  {
    poster: 'https://resource.teld.cn/teldimage/107/teld-official-index-beta-05.jpg',
    url: 'https://resource.teld.cn/telddoc/107/teld-official-index-beta-05.mp4',
  },
  {
    poster: 'https://resource.teld.cn/teldimage/107/teld-official-index-beta-06.jpg',
    url: 'https://resource.teld.cn/telddoc/107/teld-official-index-beta-06.mp4',
  }
]

export function Section1({  }: { locale: Locale }) {
  return (
    <section aria-label="introduce" className='h-[50vh] lg:h-screen w-screen relative'>
      <Carousel autoplay className="[&_li]:!w-15 [&_li_button]:!h-2 [&_li:after]:!h-2 [&_.slick-dots-bottom]:!bottom-[12vh] [&_.slick-dots-bottom]:!justify-start [&_.slick-dots-bottom]:!left-[5vw]">
        {
          list.map((item, index) => (
            <div key={index} className="h-[50vh] lg:h-screen w-screen overflow-hidden [&_video]:object-fill">
              <Video
                poster={item.poster}
                loop
                muted
                autoPlay
                playsInline
                preload="metadata"
                aria-hidden
                controls={false}
                className="h-full w-full"
              >
                <source src={item.url} type="video/mp4" />
              </Video>
            </div>
          ))
        }
      </Carousel>
    </section>
  );
}