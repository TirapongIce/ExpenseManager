import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Card, Col, Row, Space, Table, Button, Select } from 'antd';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import ModalIncome from '../components/ModalIncome';
import ModalExpenses from '../components/ModalExpenses';
import ModalDelete from '../components/ModalDelete';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import "./index.css"; // Import the styles.css file

const { Header, Content } = Layout;

const App = () => {
  const dataIncome = localStorage.getItem("Income");
  const dataExpenses = localStorage.getItem("Expenses");
  const [displayCard, setDisplayCard] = useState([
    { text: "Today Expend", value: 0 },
    { text: "Expend(Month)", value: 0 },
    { text: "Expend(Year)", value: 0 },
    { text: "Income(Year)", value: 0 }
  ]);
  const [selectMonth, setSelectMonth] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [actionID, setActionID] = useState(0);
  const [valueMonth, setValueMonth] = useState(dayjs(new Date()).format('M'));
  const [displayModal, setDisplayModal] = useState({
    income: false,
    expenses: false,
    delete: false
  });
  const [typeDelete, setTypeDelete] = useState("");
  const columnsIncome = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (item) => (
        dayjs(item).format('DD/MM/YYYY HH:mm:ss')
      )
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined className='icon-click'
            onClick={() => {
              setDisplayModal({
                ...displayModal,
                income: true,
              });
              setActionID(record.index);
            }
            } />

          <DeleteOutlined className='icon-click'
            onClick={() => {
              setDisplayModal({
                ...displayModal,
                delete: true,
              });
              setActionID(record.index);
              setTypeDelete("Income");
            }
            }
          />
        </Space>
      ),
    },
  ];
  const columnsExpenses = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (item) => (
        dayjs(item).format('DD/MM/YYYY HH:mm:ss')
      )
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category	',
      key: 'category',
      dataIndex: 'category',
      render: (item) => (
        selectCategory[item - 1]["label"]
      )

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <EditOutlined className='icon-click'
            onClick={() => {
              setDisplayModal({
                ...displayModal,
                expenses: true,
              });
              setActionID(record.index);
            }
            } />

          <DeleteOutlined className='icon-click'
            onClick={() => {
              setDisplayModal({
                ...displayModal,
                delete: true,
              });
              setActionID(record.index);
              setTypeDelete("Expenses");
            }
            }
          />
        </Space>
      ),
    },
  ];


  const onLoadSelectMonth = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthOptions = months.map((month, index) => ({
      value: index + 1,
      label: month
    }));

    setSelectMonth(monthOptions);

  }
  const onLoadSelectCategory = () => {
    const category = [
      "Food And Drink", "Shopping", "Trip", "Credit Cards", "House", "Car Payment",
      "Family", "Travel", "Bill And Utilties", "Other"
    ];
    const categoryOptions = category.map((item, index) => ({
      value: index + 1,
      label: item
    }));

    setSelectCategory(categoryOptions);

  }
  const getDataForMonthAndCategory = (month, category) => {
    const data = JSON.parse(localStorage.getItem(category)) || [];
    return data.filter(item => dayjs(item.date).format('M') === month);
  };
  const loadData = useCallback(() => {
    const resultExpenses = getDataForMonthAndCategory(dayjs(new Date()).format('M'), "Expenses");
    const sumDay = resultExpenses.filter(item => dayjs(item.date).format('D') === dayjs(new Date()).format('D'));
    const toDayExpend = sumDay.reduce((accumulator, object) => accumulator + object.money, 0);
    const expendMonth = resultExpenses.reduce((accumulator, object) => accumulator + object.money, 0);

    const expendYear = JSON.parse(dataExpenses)?.reduce((accumulator, object) => accumulator + object.money, 0) ?? 0;
    const incomeYear = JSON.parse(dataIncome)?.reduce((accumulator, object) => accumulator + object.money, 0) ?? 0;

    setDisplayCard([
      { text: "Today Expend", value: toDayExpend },
      { text: "Expend(Month)", value: expendMonth },
      { text: "Expend(Year)", value: expendYear },
      { text: "Income(Year)", value: incomeYear }
    ]);
  }, [dataIncome, dataExpenses]);
  useMemo(() => {
    onLoadSelectMonth();
    onLoadSelectCategory();
  }
    , []);
  useEffect(() => {
    loadData();
  }, [dataIncome, dataExpenses, loadData]);

  return (
    <Layout>

      {/*  =================  Modal Add And Edit  =================*/}
      {displayModal.income ? <ModalIncome displayModal={displayModal} closeModal={setDisplayModal} actionID={actionID} clearAction={setActionID} /> : null}
      {displayModal.expenses ? <ModalExpenses displayModal={displayModal} closeModal={setDisplayModal} dataCategory={selectCategory} actionID={actionID} clearAction={setActionID} /> : null}
      {displayModal.delete ? <ModalDelete displayModal={displayModal} closeModal={setDisplayModal} actionID={actionID} clearAction={setActionID} typeDelete={typeDelete} /> : null}
      {/* ========================================================= */}

      <Header className="header-container">
        <h1 style={{ color: "#fff", textAlign: "center", margin: "0 auto", borderBottom: 0 }}>Expense Manager</h1>
      </Header>
      <Content
        style={{
          padding: '0 10px',
        }}
      >
        <Row>
          <Col xs={24} xl={24} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col xs={24} xl={5} >
                  <Select
                    style={{
                      width: "100%",
                      padding: 5

                    }}
                    placeholder={"Search By Month"}
                    onChange={(e) => setValueMonth(e)}
                    options={selectMonth}
                  />
                </Col>

                <Col xs={4} xl={19} style={{
                  textAlign: "right", padding: 5
                }}>

                  <Button type="primary" style={{ backgroundColor: "green", marginRight: "10px" ,border: "1px solid" }} onClick={() => {
                    setDisplayModal({
                      ...displayModal,
                      income: true,
                    });
                    setActionID(0);
                  }}>Add Income</Button>
                  <Button type="primary" style={{ backgroundColor: "red"  ,border: "1px solid"}}
                    onClick={() => setDisplayModal({
                      ...displayModal,
                      expenses: true
                    })}>Add Expend</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          {displayCard.map((item, index) => {
            return (<Col xs={24} xl={6} key={index} style={{ padding: "5px" }}
            >

              <div className="card">
                <p className="card-title">{item.text}</p>
                <p className="card-value">{item.value}</p>
              </div>
            </Col>)
          })}
        </Row>
        <Row>
          <Col xs={24} xl={18} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
              }}
            >
              <h1>Income and Expenses</h1>
              <BarChart Month={valueMonth} />
            </Card>
          </Col>
          <Col xs={24} xl={6} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
              }}
            >
              <h1>Category Expenses</h1>
              <PieChart Month={valueMonth} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={24} xl={12} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
                // height: "600px"
              }}
            >
              <h1>Income History</h1>
              <Table columns={columnsIncome} dataSource={
                !JSON.parse(dataIncome) ? [] : JSON.parse(dataIncome)
              } style={{ width: "100%" }} scroll={{ x: true, y: 500 }} rowKey="index" />
            </Card>
          </Col>

          <Col xs={24} xl={12} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
                // height: "600px"
              }}
            >
              <h1>Expenses History</h1>
              <Table columns={columnsExpenses} dataSource={
                !JSON.parse(dataExpenses) ? [] : JSON.parse(dataExpenses)
              } style={{ width: "100%" }} scroll={{ x: true, y: 500 }} rowKey="index" />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default App;