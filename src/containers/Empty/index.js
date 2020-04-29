import React from 'react';
import './App.css';

class About extends React.Component {
    render() {
        return (
            <view className={'catalogContainer'}>
            {/*<view style={{backgroundColor: 'white'}} >*/}
            <view className='catalogImage'/>
            <view className='list'>
                <view className='item'>item 1</view><br/>
                <view className='item'>item 2</view><br/>
                <view className='item'>item 3</view><br/>
                <view className='item'>item 4</view><br/>
                <view className='item'>item 5</view><br/>
                <view className='item'>item 6</view><br/>
                <view className='item'>item 7</view><br/>
                <view className='item'>item 8</view><br/>
                <view className='item'>item 8</view><br/>
                <view className='item'>item 8</view><br/>
                <view className='item'>item 8</view><br/>
            </view>
            </view>
        );
    }
}

export default About;
