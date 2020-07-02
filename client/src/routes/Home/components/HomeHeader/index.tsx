import React, {useState} from "react";
import "./index.less";
import classnames from 'classnames';
let logo = require('@/assets/images/logo.png')
import {UnorderedListOutlined} from "@ant-design/icons";
interface Props {
  currentCategory: string, // 当前分类，存在redux中
  setCurrentCatgory: (currentCategory: string) => any
}
function HomeHeader(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const setCurrentCatgory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement;
    let category = target.dataset.category;
    props.setCurrentCatgory(category);
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo.default} alt=""/>
        <UnorderedListOutlined onClick={() => setIsMenuVisible(!isMenuVisible)}/>
      </div>
     {
        isMenuVisible && (
          <ul
            className="category"
            onClick={setCurrentCatgory} 
            >
            <li data-category="all" className={classnames({active: props.currentCategory === 'all'})}>全部车型</li>
            <li data-category="BMW" className={classnames({active: props.currentCategory === 'BMW'})}>BMW 530Li</li>
            <li data-category="AUDI" className={classnames({active: props.currentCategory === 'AUDI'})}>AUDI 45TFSI</li>
          </ul>
        )
     }
    </header>
  );
}
export default HomeHeader;
