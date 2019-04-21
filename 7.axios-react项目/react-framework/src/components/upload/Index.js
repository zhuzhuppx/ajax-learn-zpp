import React from 'react'
import { Icon } from 'antd';
import fetchData from '../../api/axiosUtil'
import './index.less'
class UploadFile extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    startUpload = () => {
        this.refs.uploadInput.click();
    }
    onChange = (e) => {
        let files = e.target.files;
        const { onChange } = this.props
        fetchData(
            "post",
            "/upload",
            {},
            result => {
                onChange(result);
            },
            error => {
                console.log("fetch error:" + error);
            }
        );

    }
    render() {
        let { startUpload, onChange, } = this;
        let { value } = this.props;
        return (
            <div>
                <input type="file" ref="uploadInput" style={{ display: 'none' }} onChange={onChange}></input>
                <Icon type="plus" onClick={startUpload} />
                <img className="avator" src={value} alt="图片"></img>
            </div>
        )
    }
}
export default UploadFile