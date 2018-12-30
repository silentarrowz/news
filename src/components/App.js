import React, { Component } from "react";
import { List, Card, Skeleton } from 'antd';
import styles from './App.less';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            newsList:[],
            loading:true
        }
    }
    componentDidMount(){
        this.getApiData();
    }

    getApiData (){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=1af110441a8e4f72925f78344e58c2a4"
        let that = this;
        fetch(url,{
            method:"GET"        
        }).then((res)=>res.json())
        .then((data)=>{
            let newsList = data.articles;
            that.setState({
                newsList,
                loading:false
            });
        })
        .catch((err)=>console.log('err : ',err));
     }
    render() {
        return (
            <div >
                <h1>Latest News</h1>
               
                <List
                    grid={{
                    gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3,
                    }}
                    dataSource={this.state.newsList}
                    renderItem={item => {
                        if(item.description && item.urlToImage){
                        let description = item.description.split(' ');
                        let length = description.length;
                        let newDescription = '';
                        if(length>20){
                            newDescription = description.slice(0,20).join(' ') + '...';
                        }else{
                            newDescription = description.join(' ');
                        }
                        console.log('description : ',item.description);
                       console.log('new description : ',newDescription);
                  return  <List.Item>
                        {this.state.loading && this.state.newsList.length ===0?
                        <Skeleton />:
                        <Card 
                        hoverable 
                        bordered={true}                      
                        title={item.title}  
                        cover={<img className='cardImage' onClick={(e)=> this.openModal(item,e)} alt="example" src={item.urlToImage} />}
                        className='globalCardStyle'
                        bodyStyle={{height:'100px'}}
                        > 
                        <div className='cardContent'>
                        <p className='description'> {newDescription} 
                        <a href={item.url} target="_blank">Read More</a>
                        </p>
                        
                            </div>
                       
                      </Card>}
                       
                     
                    </List.Item>
                        }
                        return [];
                    }}
                />
            </div>
        );
    }
}

export default App;