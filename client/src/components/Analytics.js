import { Progress } from 'antd'
import React from 'react'
import '../resources/analytics.css'

function Analytics({ transactions }) {
    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionPercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpenseTransactionPercentage = (totalExpenseTransactions.length / totalTransactions) * 100

    const totalTurnOver = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnOver = transactions.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => transaction.type === 'income' && acc + transaction.amount, 0);
    const totalExpenseTurnOver = transactions.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => transaction.type === 'expense' && acc + transaction.amount, 0);
    const totalIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnOver) * 100;
    const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnOver) * 100;
    const categories = ['salary','freelance','food' ,'entertainment','education','travel','investment','medical','tax','electricity','transportation'];
    return (
        <div className='analytics'>
            <div className='row'>
                <div className='col-md-4 mt-3'>
                    <div className='transactions-count'>
                        <h4>Total Transactions : {totalTransactions}</h4>
                        <hr />
                        <h5 class='i'>Income:{totalIncomeTransactions.length}</h5>
                        <h5 class='e'>Expense:{totalExpenseTransactions.length}</h5>
                        <div className='progress-bars d-flex '>
                            <Progress className='mx-5' strokeColor='#50f011' type='circle' percent={totalIncomeTransactionPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type='circle' percent={totalExpenseTransactionPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mt-3'>
                    <div className='transactions-count '>
                        <h4>Total TurnOver : {totalTurnOver}</h4>
                        <hr />
                        <h5 class='i'>Income:{totalIncomeTurnOver}</h5>
                        <h5 class='e'>Expense:{totalExpenseTurnOver}</h5>
                        <div className='  progress-bars d-flex '>
                            <Progress className='mx-5' strokeColor='#50f011' type='circle' percent={totalIncomeTurnOverPercentage.toFixed(0)} />
                            <Progress strokeColor='red' type='circle' percent={totalExpenseTurnOverPercentage.toFixed(0)} />
                        </div>
                    </div>
                </div>
            </div>    
             <hr/>
                <div className='row mt-3'>
                 <div className='col-md-6 '>
                    <div className='income-category-analysis'>
                       <h4>Total Income Category Wise</h4>  
                       {categories.map((category)=>{
                        const amount=transactions.filter(t=>t.type==='income' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                        return( 
                         amount>0 && <div className='category-card'>
                          <h5>{category}</h5>
                          <Progress strokeColor='#50f011' percent={((amount/totalIncomeTurnOver)*100).toFixed(0)}/>
                        </div>
                        );
                       })}
                    </div>

                 </div>
                 <div className='col-md-6 '>
                    <div className='expense-category-analysis'>
                       <h4>Total Expense Category Wise</h4>  
                       {categories.map((category)=>{
                        const amount=transactions.filter(t=>t.type==='expense' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                        return( 
                        amount>0 &&  <div className='category-card'>
                          <h5>{category}</h5>
                          <Progress strokeColor='red' percent={((amount/totalExpenseTurnOver)*100).toFixed(0)}/>
                        </div>
                        );
                       })}
                    </div>

                 </div>
                
              </div> 
        </div>

    )
}

export default Analytics