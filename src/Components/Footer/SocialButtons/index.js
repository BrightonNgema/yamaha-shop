import React from 'react'
import { ListItem } from '@material-ui/core';

const socials = ["facebook", "twitter", "youtube", "instagram"];
export const SocialButton = ({ last, url, liststyle, socialMedia }) => {
        return socials.map((social) => (
        <ListItem style={{ padding:'0px 2px', ...liststyle }}>
            <a href={url} className={`icon-button ${social}`} target="_blank" rel="noopener noreferrer">
                <i className={`fa fa-${social} icon-${social}`}></i>
                <span></span>
            </a>
        </ListItem>
    ))
}

// Will need to pass the category to determine social media links
