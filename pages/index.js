import Head from 'next/head';
import ToolBar from '../components/ToolBar';
import TypeList from '../components/TypeList';

export default function Home() {
  return (
    <div>
       <Head>
        <title>Home Page</title> 
      </Head>
      <ToolBar />
      <TypeList/>
    </div>
  )
}
