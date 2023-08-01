import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Card, Col, Row, Space, Table, Tag, Button, Select } from 'antd';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import ModalIncome from '../components/ModalIncome';
import ModalExpenses from '../components/ModalExpenses';
import dayjs from 'dayjs';
import "./index.css"; // Import the styles.css file

const { Header, Content } = Layout;

const App = () => {

  const [displayCard, setDisplayCard] = useState([
    { text: "Today Expend", value: 0 },
    { text: "Expend(Month)", value: 0 },
    { text: "Expend(Year)", value: 0 },
    { text: "Income(Year)", value: 0 }
  ]);
  const [selectMonth, setSelectMonth] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [actionID, setActionID] = useState(0);
  const [displayModal, setDisplayModal] = useState({
    income: false,
    expenses: false,
  });
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
          <a onClick={() => {
            setDisplayModal({
              ...displayModal,
              income: true,
            });
            setActionID(record.index);
          }
          }
          >Edit</a>
          <a>Delete</a>
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
        selectCategory[item]["label"]
      )

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setDisplayModal({
              ...displayModal,
              expenses: true,
            });
            setActionID(record.index);
          }
          }
          >Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [];

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



  useMemo(() => {
    onLoadSelectMonth();
    onLoadSelectCategory();
  }
    , []);

  return (
    <Layout>

      {/*  =================  Modal Add And Edit  =================*/}

      {displayModal.income ? <ModalIncome displayModal={displayModal} closeModal={setDisplayModal} actionID={actionID} clearAction={setActionID} /> : null}
      {displayModal.expenses ? <ModalExpenses displayModal={displayModal} closeModal={setDisplayModal} dataCategory={selectCategory} actionID={actionID} clearAction={setActionID} /> : null}

      {/* ========================================================= */}

      <Header className="header-container">
        <h1 style={{ color: "#fff", textAlign: "center", margin: "0 auto" }}>Expense Manager</h1>
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
                    // onChange={handleChange}
                    options={selectMonth}
                  />
                </Col>
                <Col xs={24} xl={5} >
                  <Select
                    placeholder={"Search By Category"}
                    style={{
                      width: "100%",
                      padding: 5
                    }}
                    // onChange={handleChange}
                    options={selectCategory}
                  />
                </Col>
                <Col xs={4} xl={14} style={{
                  textAlign: "right", padding: 5
                }}>

                  <Button type="primary" style={{ backgroundColor: "green", marginRight: "10px" }} onClick={() => {
                    setDisplayModal({
                      ...displayModal,
                      income: true,
                    });
                    setActionID(0);
                  }}>Add Income</Button>
                  <Button type="primary" style={{ backgroundColor: "red" }}
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
              <BarChart />
            </Card>
          </Col>
          <Col xs={24} xl={6} style={{ padding: "5px" }}>
            <Card
              style={{
                width: "100%",
              }}
            >
              <h1>Category Expenses</h1>
              <PieChart />
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
                !JSON.parse(localStorage.getItem("Income")) ? [] : JSON.parse(localStorage.getItem("Income"))
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
                !JSON.parse(localStorage.getItem("Expenses")) ? [] : JSON.parse(localStorage.getItem("Expenses"))
              } style={{ width: "100%" }} scroll={{ x: true, y: 500 }} rowKey="index" />
            </Card>
          </Col>
        </Row>
      </Content>


    </Layout>


  );
};
export default App;