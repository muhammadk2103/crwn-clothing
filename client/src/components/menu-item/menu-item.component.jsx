import React from "react";

import { useNavigate } from "react-router-dom";

import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
  } from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl}) => {
    const navigate = useNavigate();

    return (
        <MenuItemContainer
            size={size}
            onClick={() => navigate(`/shop/${linkUrl}`)}
        >  
            <BackgroundImageContainer
                className='background-image'
                imageUrl={imageUrl}
            />
  
            <ContentContainer className="content">
                <ContentTitle>{ title.toUpperCase() }</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
}
export default MenuItem;