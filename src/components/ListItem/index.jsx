import React, {useEffect, useState} from 'react';
import {Table, Pagination, Input, Button, Modal, message, Form} from 'antd';
import AddItem from "../AddItem";
import axios from 'axios';

import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import FileUpload from "../FileUpload";
import {BACK_URL} from "../../constant";

const ListItem = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [searchName, setSearchName] = useState('');
    const {confirm} = Modal;
    const [form] = Form.useForm();
    const [item, setItem] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [url, setUrl] = useState('');


    const fetchData = async (page = pagination.current, pageSize = pagination.pageSize) => {
        try {
            const response = await axios.get(BACK_URL + '/employee/page', {
                params: {
                    page: page,
                    pageSize: pageSize,
                    name: searchName,
                },
            });
            const tableData = response.data.data.records;
            setData(tableData);
            setPagination({
                current: response.data.data.current,
                pageSize: response.data.data.size,
                total: response.data.data.total,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (page, pageSize) => {
        setPagination({
            current: page,
            pageSize: pageSize,
            total: pagination.total,
        });
        fetchData(page, pageSize);
    };

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleSearchSubmit = () => {
        setPagination({
            current: 1,
            pageSize: pagination.pageSize,
            total: pagination.total,
        });
        fetchData(1, pagination.pageSize);
    };

    const deleteitem = (item) => {
        confirm({

            content: '?????????????????????',
            onOk() {
                deleteok(item);
            }
        });
    }

    const deleteok = (item) => {
        setData(data.filter((i) => i.id !== item.id));
        try {

            axios.delete(BACK_URL + `/employee/${item.id}`);
            message.success('???????????????');
        } catch (error) {
            message.error(error);
        }
    }

    const updateitem = (item) => {

        setItem(item)
        setIsModalVisible(true)
    }

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setItem({})
        form.resetFields();
    };

    const handleModalOk = () => {
        //????????????
        form.validateFields().then((values) => {
            const newValues = {"image": url, ...values}

            setData(data.map((number) => {
                if (number.id === newValues.id) {
                    return newValues; // ??????id????????????????????????????????????
                } else {
                    return number; // ??????id?????????????????????????????????
                }
            }));
            try {
                axios.put(BACK_URL + '/employee', newValues);
                message.success('edit success')
                setIsModalVisible(false);
                form.resetFields();
                fetchData()
            } catch (error) {
                message.error(error)
            }
        })
    };

    function handleRefresh() {
        // ?????????????????????????????????????????????

        fetchData()
    }

    const handleFileUploadSuccess = (url) => {
        setUrl(url)
    }

    return (
        <div>
            <div style={{marginBottom: '16px'}}>
                <Input value={searchName} onChange={handleSearchChange} style={{marginRight: '16px', width: '600px'}}/>
                <Button type="primary" onClick={handleSearchSubmit} style={{marginTop: '20px'}}>
                    Search
                </Button>
            </div>

            <AddItem onFormSubmit={handleRefresh}/>
            <Table style={{marginTop: '20px'}}
                   columns={[
                       {
                           title: 'image',
                           dataIndex: 'image',
                           render: (title) => {

                               return <img src={title} alt="" width={100} height={100}/>
                           },
                       },
                       {
                           title: 'Name',
                           dataIndex: 'name',
                       },
                       {
                           title: 'Account',
                           dataIndex: 'account',
                       },
                       {
                           title: 'Sex',
                           dataIndex: 'sex',
                       },
                       {
                           title: 'Phone',
                           dataIndex: 'phone',
                       },
                       {
                           title: 'Title ID',
                           dataIndex: 'titleId',
                           render: (title) => {
                               if (title === 1) {
                                   return "SE";
                               } else {
                                   return "PG";
                               }
                           },
                       },
                       {
                           title: 'Basic Salary',
                           dataIndex: 'basicSalary',
                       },
                       {
                           title: 'Create Time',
                           dataIndex: 'createTime',
                       },

                       {
                           title: '??????/??????',
                           render: (item) => {
                               return (
                                   <div>
                                       <Button
                                           style={{marginRight: '10px'}}
                                           danger
                                           shape="circle"
                                           icon={<DeleteOutlined/>}
                                           onClick={() => {
                                               deleteitem(item);
                                           }}

                                       />

                                       <Button
                                           type="primary"
                                           shape="circle"
                                           icon={<EditOutlined/>}
                                           onClick={() => {
                                               updateitem(item);
                                           }}
                                       />
                                   </div>
                               )
                           }
                       }
                   ]}
                   dataSource={data}
                   pagination={pagination}
                   onChange={handlePageChange}
            />
            <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
            />

            <Modal
                visible={isModalVisible}
                title="??????"
                onCancel={handleModalCancel}
                onOk={handleModalOk}
            >
                <Form form={form} initialValues={item}>
                    <Form.Item name="id" hidden>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please input name!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{required: true, message: 'Please input phone!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="basicSalary"
                        label="Basic Salary"
                        rules={[{required: true, message: 'Please input salary!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="titleId"
                        label="Title"
                        rules={[{required: true, message: 'Please input salary!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <FileUpload onUploadSuccess={handleFileUploadSuccess}/>
                </Form>
            </Modal>
        </div>
    );
};

export default ListItem;