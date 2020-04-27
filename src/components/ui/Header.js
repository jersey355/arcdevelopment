import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';

import logo from '../../assets/logo.svg';

const ElevationScroll = (props) => {

    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em'
    },
    logo: {
        height: '8em'
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        marginLeft: '25px',
        minWidth: 10
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: '50px',
        height: '45px',
        marginLeft: '50px',
        marginRight: '25px'
    }
}));

const Header = (props) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        if (window.location.pathname === "/" && selectedTab !== 0) {
            setSelectedTab(0);
        } else if (window.location.pathname === "/services" && selectedTab !== 1) {
            setSelectedTab(1);
        } else if (window.location.pathname === "/revolution" && selectedTab !== 2) {
            setSelectedTab(2);
        } else if (window.location.pathname === "/about" && selectedTab !== 3) {
            setSelectedTab(3);
        } else if (window.location.pathname === "/contact" && selectedTab !== 4) {
            setSelectedTab(4);
        } else if (window.location.pathname === "/estimate" && selectedTab !== 5) {
            setSelectedTab(5);
        }
    }, [selectedTab]);

    const onTabChange = (e, value) => {
        setSelectedTab(value);
    }

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" color="primary">
                    <Toolbar disableGutters>
                        <Button
                            component={Link}
                            to="/"
                            onClick={() => setSelectedTab(0)}
                            className={classes.logoContainer}
                            disableRipple
                        >
                            <img src={logo} className={classes.logo} alt="Company Logo" />
                        </Button>
                        <Tabs
                            value={selectedTab}
                            onChange={onTabChange}
                            className={classes.tabContainer}
                            indicatorColor="primary"
                        >
                            <Tab label="Home" component={Link} to="/" className={classes.tab} />
                            <Tab label="Services" component={Link} to="/services" className={classes.tab} />
                            <Tab label="The Revolution" component={Link} to="/revolution" className={classes.tab} />
                            <Tab label="About Us" component={Link} to="/about" className={classes.tab} />
                            <Tab label="Contact Us" component={Link} to="/contact" className={classes.tab} />
                            <Button variant="contained" component={Link} to="/estimate" color="secondary" className={classes.button}>
                                Free Estimate
                            </Button>
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    );

}

export default Header;