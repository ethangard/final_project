import React, { useEffect, useState } from 'react'
import { Report } from '../../requests'
import BarChart from './BarChart'
import { UserData } from './data'

const ReportComponent = () => {
  const [reports, setReports] = useState([])
  const [articleViews, setArticleViews] = useState({
    labels: reports.map((a) => a.id),
    datasets: [
      {
        label: 'Articles Views',
        data: reports.map((a) => a.views),
      },
    ],
  })

  useEffect(() => {
    const fetchedReports = async () => {
      const data = await Report.index()
      setReports(data)
    }
    fetchedReports()
  }, [])

  // useEffect(() => {

  //   setArticleViews({
  //     labels: reports.map((a) => a.id),
  //     datasets: [
  //       {
  //         label: 'Articles Views ',
  //         data: reports.map((a) => a.views),
  //       },
  //     ],
  //   })

  // }, [reports])

  const [reportData, setReportData] = useState({
    labels: [10,20,30,40].map((data) => data),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
      },
    ],
  })

  // useEffect(() => {
  //   setArticleViews({
  //     labels: reports.map((a) => a.id),
  //     datasets: [
  //       {
  //         label: 'Articles Views ',
  //         data: reports.map((a) => a.views),
  //       },
  //     ],
  //   })
  // }, [articleViews])

  console.log(reports)

  return (
    <div>
{/*       <div>ReportComponent</div> */}
      {/*   {console.log(reports)} */}
      <BarChart chartData={reportData} />
      <div className="chart">
        <BarChart chartData={articleViews} />
      </div>
    </div>
  )
}

export default ReportComponent
