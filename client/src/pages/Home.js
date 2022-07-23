import { DatePicker, message, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import "../resources/transaction.css";
import { UnorderedListOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { AreaChartOutlined, } from '@ant-design/icons';
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;
function Home() {
  const [showAddEditTransactionModel, setShowAddEditTransactionModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([])
  const [frequency, setFrequency] = useState('7');
  const [type, setType] = useState('all');
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState('table');
  const[selectedTransactionForEdit,setSelectedTransactionForEdit]=useState(null)
  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ExpenseTracker"))
      
      setLoading(true)
      const response = await axios.post("/api/transactions/get-all-transactions", {
        userid: user._id, frequency, ...(frequency === "Custom" && { selectedRange }),
        type
      }
      );
      setTransactionsData(response.data)
      setLoading(false);

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  }
  const deleteTransaction = async (record) => {
    try {
      setLoading(true)
      await axios.post("/api/transactions/delete-transaction", 
      {
        transactionId:record._id            
      }
      );
     message.success("Transaction Deleted Successfully");
     getTransactions();
     setLoading(false);

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  }
  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: 'amount',
      
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title:'Actions',
      dataIndex:'actions',
      render:(text,record)=>{
        return<div>
         <EditOutlined onClick={()=>{
          setSelectedTransactionForEdit(record)
          setShowAddEditTransactionModel(true)
         }}/>
         <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
         </div>
      }
    }
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='Custom'>Custom</Select.Option>
            </Select>
            {frequency === 'Custom' && (

              <div className="mt-2">
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>

            </Select>

          </div>
        </div>
        <div className="d-flex">
          <div className="view-switch mx-5">
            <UnorderedListOutlined className={`mx-3 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`} size={30} onClick={()=>setViewType('table')}/>
            <AreaChartOutlined className={`${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`} size={30} onClick={()=>setViewType('analytics')}/>
          </div>
          <div>

          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModel(true)}
          >
            ADD NEW
          </button>
        </div>

      </div>
      <div className="Table-Analytics">
       {viewType==='table' ? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div>:<Analytics transactions={transactionsData}/>}

      </div>

      {showAddEditTransactionModel && (
        <AddEditTransaction
          showAddEditTransactionModel={showAddEditTransactionModel}
          setShowAddEditTransactionModel={setShowAddEditTransactionModel}
          selectedTransactionForEdit={selectedTransactionForEdit}
          getTransactions={getTransactions}
          setSelectedTransactionForEdit={setSelectedTransactionForEdit}
        />
      )}

    </DefaultLayout>
  );
}
export default Home;