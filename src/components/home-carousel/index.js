import "./index.less";
import React, { useEffect, useState } from "react";
import { Carousel, message } from "antd";
import axios from "axios";

const HomeCarousel = (props) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(" http://yjxt.elatis.cn/options/name/carousel").then((res) => {
			if (res.data.code === 0) {
				setData(res.data.data);
			} else {
				message.error(res.data.code);
			}
		});
	}, []);
	return (
		<Carousel effect='fade' style={{ width: "540px", height: "374px" }} autoplay dotPosition='bottom'>
			{
				data.map((item, index) => {
					console.log(item.picUrl);
					return (
						<a href={item.href} key={item}>
              <div className='home-carousel' style={{ position: "relative",
              background:`url(${item.picUrl})`,backgroundSize:"cover",backgroundRepeat:"no-repeat" }} >
							</div>
							<div className='carousel-bar'>
								<p>
									{item.title}
								</p>
							</div>
						</a>
					);
				})
			}

		</Carousel>
	);
};
export default HomeCarousel;
