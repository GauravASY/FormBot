import React from 'react'
import { useTheme } from '../../Utility/ThemeContext';
import './ResponseStats.css'
import { PieChart } from 'react-minimal-pie-chart';

function ResponseStats({formResponses, formElements, visitCount, start}) {
    const {theme} = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight:'100vh' }} className={`${theme}`}>

        {
            formResponses.length === 0 ? <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%', fontSize:'2rem'}}>No Responses Yet</div> : 
          <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight:'100vh' }} className={`${theme}`}>
            <div style={{display:'flex', gap:'100px', alignItems:'center',justifyContent:'center', padding:'20px', marginTop:'40px'}}>
            <StatBlock title="Views" value={visitCount}/>
            <StatBlock title="Starts" value={start}/>
        </div>
        <div className='TableContainer'>
            <DynamicTable columnData={formElements} rowData={formResponses}/>
        </div>
        <div style={{display:'flex', gap:'120px', alignItems:'center',justifyContent:'center', padding:'20px', marginTop:'40px'}}>
            <div style={{width:'16%'}}>
                <PieChart
                    data={[
                        { title: 'Completed', value: formResponses.length || 0 , color: '#3B82F6' },
                        { title: 'Remaining', value: start - formResponses.length, color: 'grey' },
                    ]}
                    lineWidth={20}
                    animate
                    startAngle={-45}
                />
            </div>

            <StatBlock title="Completion Rate" value={`${formResponses.length * 100 / start}%`}/>
        </div>
          </div>
       
       }
        
    </div>
  )
}

function StatBlock({title, value}){
    const {theme} = useTheme();
    return (
        <div className={`StatBlock`} style={theme === "Light" ? {background:'grey'}: {}}>
            <span className='word' style={{fontSize:'2rem'}}>{title}</span>
            <span className='word' style={{fontSize:'1.6rem'}}>{value}</span>
        </div>
    )
}


const DynamicTable = ({ columnData, rowData }) => {
    if (!rowData || rowData.length === 0 ) {
      return <div>No Data Available</div>;
    }
  
    return (
      <table border="1" style={{ width: "100%", borderCollapse: "collapse", border : 'solid grey thin', borderRadius:'0.5rem' }}>
        <thead>
          <tr>
            <th className='cell'></th>
            <th className='cell'>Submitted At</th>
            <th className='cell'>Email</th>
            {columnData.map((column, index) => (
              <th key={index} className='cell'>
                {column.Type} {column.Category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td className='cell'>{rowIndex+1}</td>
              <td className='cell'>{row.submittedAt}</td>
              <td className='cell'>{row.email}</td>
              {
                row.data.map((rowVal, rowInd) => (
                    <td key={rowInd} className='cell'>{rowVal.value}</td>
                ))
              }    
            </tr>
            ))
          }
        </tbody>
      </table>
    );
  };
  
  



export default ResponseStats