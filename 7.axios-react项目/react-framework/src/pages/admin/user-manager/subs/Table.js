import React from 'react'
import { Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
class TableData extends React.Component {
    constructor(props) {
        super(props);      
    }
    
    render() {
        let { data,deleteData, editData} = this.props;
        return (
            <Table dataSource={data} rowKey="id">
                <Column
                    title="Name"
                    dataIndex="name"
                />
                <Column
                    title="Age"
                    dataIndex="age"
                />
                <Column
                    title="phone"
                    dataIndex="phone"
                />
                <Column
                    title="Action"
                    render={(text, record) => (
                        <span>
                            <a href="javascript:;" onClick={()=>editData(record)}>编辑</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>deleteData(record)}>删除</a>
                        </span>
                    )}
                />
            </Table>
        )
    }

}
export default TableData