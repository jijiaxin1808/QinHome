import React from "react";
import styles from "./index.css";
import { Input } from 'antd';
import 'antd/dist/antd.css';

const HeadInput = (props) => {
    return (
        <div className={styles.HeadInput}>
            <div className={styles.HeadInputTop}>{props.topTitle}</div>
            <Input placeholder={props.name} className={styles.HeadInputContain} />
        </div>
    )
}

const FooterContain = (props) => {
    return (
        <div className = {styles.FooterContainMain}>
            <div className={styles.FooterContainHead}>
                <div className={styles.FooterContainHeadLeft}>
                    {props.title}
                </div>
                <div className={styles.FooterContainHeadCenter}></div>
                <div className={styles.FooterContainHeadRight}>
                    保存
                </div>
            </div>
            <Input.TextArea className={styles.FooterContainFooter} />
        </div>
    )
}

const MainContain = () =>{
    return (
        <div className={styles.MainContain}>
            <div className={styles.MainContainLift}>
                <img src={require('../../../../../assets/tupian-2.png') } style={{textAlign: "left"}} />
            </div>
            <div  className={styles.MainContainRight}>
                <div className={styles.MainContainRightFirst}>
                    文件详情
                </div>
                <div className={styles.MainContainRightSecond}>
                    <div>新建时间：2019年10月7日 10:39</div>
                    <div>文件夹名：雷鹏飞的文件夹</div>
                </div>
                <div className={styles.MainContainRightThird}>
                    <div className={styles.MainContainRightThirdLeft}>确认上传</div>
                    <div className={styles.MainContainRightThirdMiddle}></div>
                    <div className={styles.MainContainRightThirdRight}>上传</div>
                </div>
            </div>
        </div>
    )
}

const EditFiles = ()=> {
    return(
        <div className={styles.Edit}>
            <HeadInput topTitle="编辑文件夹" name="雷鹏飞的文件夹" />
            <MainContain />
            <FooterContain title="添加文件夹说明" />
        </div>
    )

}
export default EditFiles;