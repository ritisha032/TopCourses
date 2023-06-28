import React, { useEffect } from "react";
import { apiUrl,filterData } from "./data";
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Cards from './components/Cards';
import {toast} from "react-toastify";
import { useState } from "react";
import Spinner from "./components/Spinner";


const App = () => {
  const[courses,setCourses]=useState([]);
  const[loading,setLoading]=useState(true);
  const[category,setCategory]=useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{
      let response=await fetch(apiUrl);
      let output=await response.json();
    //  console.log(output);
      setCourses(output.data);
    }
    catch(error){
        toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect( () => {
    fetchData();
  },[])
  
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar></Navbar>  
      </div>    
      <div className="bg-bgDark2">
         <div>
        <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
      </div>
      <div 
      className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap items-center min-h-[50vh] justify-center">
          { loading?(<Spinner/>):(<Cards courses={courses} category={category}/>)}
      </div>
      </div>
     
      
    </div>
  );
};

export default App;
