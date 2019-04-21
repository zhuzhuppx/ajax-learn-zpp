import React from 'react'
import TableData from './subs/Table'
import Modify from './subs/Modify'
import Search from './subs/Search'
import fetchData from "../../../api/axiosUtil";
class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [], showDialog: false,currentRow:{} }
	}
	componentDidMount() {
		this.getData();
	}
	deleteData = (item) => {
		let { id, name, age, phone, avator } = item;
		fetchData(
			"get",
			"/deleteUser",
			{ id: id },
			result => {
				this.getData()
				alert("delete success");
			},
			error => {
				console.log("fetch error:" + error);
			}
		);

	}
	addData=()=>{
		this.setState({ showDialog: true})
	}
	editData = (item) => {
		console.log(item);
		this.setState({ showDialog: true,currentRow:Object.assign({},item) })
	}
	handleCancel = () => {
		this.setState({ showDialog: false })
	}
	handleCreate = () => {
		const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
			console.log('Received values of form: ', values);
			let {id} = this.state.currentRow;
			fetchData(
				"post",
				"/saveUser",
				Object.assign({},{...values},{id:id}),
				result => {
					alert("save success");
					this.getData()
				},
				error => {
					console.log("fetch error:" + error);
				}
			);
            form.resetFields();
            this.handleCancel();
        });
	}
	
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }
	getData = () => {
		fetchData(
			"get",
			"/getUserList",
			{},
			list => {
				console.log("fetch success!");
				console.log(list);
				this.setState({
					list: list
				});
			},
			error => {
				console.log("fetch error:" + error);
			}
		);
	};
	render() {
		let { list, showDialog ,currentRow} = this.state;
		let { deleteData, editData ,addData,getData} = this;
		return (
			<div>
				<Search addData={addData} searchData={getData}></Search>
				<TableData data={list} deleteData={deleteData} editData={editData}></TableData>
				<Modify
					wrappedComponentRef={this.saveFormRef}
					visible={showDialog}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
					currentRow={currentRow}
				/>
			</div>
		)
	}
}
export default UserList