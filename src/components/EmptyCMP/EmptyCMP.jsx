/**
 * Empty component
 */
import React from 'react';
import {Empty} from 'antd';
import './EmptyCMP.css'

function EmptyCMP(){
    return(
        <div className='EmptyCMP'>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        </div>
    )
}

export default EmptyCMP;