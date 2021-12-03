import React, {PureComponent} from 'react'
import { withRouter } from 'react-router-dom';
import CategoryInforText from './CategoryInforText';
import CatergoryButtons from './CatergoryButtons';
import { isMobile, isTablet } from 'react-device-detect';
import './index.css';

class SideInfo extends PureComponent{
    render(){ 
        const device = isMobile || isTablet ? 'mobile' : 'desktop';
        return(
            <div className={`${device}-category-container woy`}>
                <CategoryInforText data={this.props.data}/>
                <CatergoryButtons />
            </div>
        )
    }
}

export default withRouter(SideInfo)
