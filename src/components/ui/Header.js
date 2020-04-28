import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Button,
    Menu,
    MenuItem,
    SwipeableDrawer
} from '@material-ui/core';
import { useScrollTrigger, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

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
        marginBottom: '3em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '2em'
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: '1.25em'
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down('md')]: {
            height: '7em'
        },
        [theme.breakpoints.down('xs')]: {
            height: '5.5em'
        }
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
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        borderRadius: '0px',
        color: "white"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    }
}));

const Header = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const menuOptions = [
        { name: 'Services', link: '/services' },
        { name: 'Custom Software Development', link: '/customsoftware' },
        { name: 'Mobile App Development', link: '/mobileapps' },
        { name: 'Website Development', link: '/websites' }
    ];

    useEffect(() => {

        switch (window.location.pathname) {
            case "/":
                setSelectedTab(0);
                break;
            case "/services":
                setSelectedTab(1);
                setSelectedMenuItem(0);
                break;
            case "/customsoftware":
                setSelectedTab(1);
                setSelectedMenuItem(1);
                break;
            case "/mobileapps":
                setSelectedTab(1);
                setSelectedMenuItem(2);
                break;
            case "/websites":
                setSelectedTab(1);
                setSelectedMenuItem(3);
                break;
            case "/revolution":
                setSelectedTab(2);
                break;
            case "/about":
                setSelectedTab(3);
                break;
            case "/contact":
                setSelectedTab(4);
                break;
            case "/estimate":
                setSelectedTab(5);
                break;
            default:
                break;
        }

    }, [selectedTab]);

    const handleTabChange = (e, value) => {
        setSelectedTab(value);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setIsOpen(true);
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        setIsOpen(false);
    }

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setIsOpen(false);
        setSelectedMenuItem(i);
    }

    const tabs = (
        <React.Fragment>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                className={classes.tabContainer}
                indicatorColor="primary"
            >
                <Tab label="Home" component={Link} to="/" className={classes.tab} />
                <Tab
                    label="Services"
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup={anchorEl ? "true" : undefined}
                    component={Link}
                    to="/services"
                    onMouseOver={e => handleClick(e)}
                    className={classes.tab}
                />
                <Tab label="The Revolution" component={Link} to="/revolution" className={classes.tab} />
                <Tab label="About Us" component={Link} to="/about" className={classes.tab} />
                <Tab label="Contact Us" component={Link} to="/contact" className={classes.tab} />
            </Tabs>
            <Button variant="contained" component={Link} to="/estimate" color="secondary" className={classes.button}>
                Free Estimate
                        </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
            >
                {menuOptions.map((option, i) => (
                    <MenuItem
                        key={i}
                        component={Link}
                        to={option.link}
                        classes={{ root: classes.menuItem }}
                        onClick={(e) => {
                            handleMenuItemClick(e, i);
                            setSelectedTab(1);
                            handleClose();
                        }}
                        selected={i === selectedMenuItem && selectedTab === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

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
                        {matches ? null : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </>
    );

}

export default Header;