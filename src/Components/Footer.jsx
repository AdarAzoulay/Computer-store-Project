import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  colS: {
    padding: "1em",
  },
  icons: {
      margin: "0.5rem 0 0 0.5rem",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  icon:{
      cursor: "pointer",
      marginRight: "0.5rem",
      fontSize: "3em"
      
  }

});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className="main-footer">
      <div className={classes.row}>
        {/* Column1 */}
        <div className="listUnstyled">
          <h4>The computer store</h4>
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem necessitatibus quis sapiente amet nam repellendus! Sit saepe commodi eum, quisquam officia laboriosam voluptatum at quis?</div>
        </div>
        {/* Column2 */}
        <div className="listUnstyled">
          <h4>About us</h4>
          <Link to="/About">About</Link>
        </div>
        {/* Column3 */}
        <div className="listUnstyled">
          <h4>Stuff</h4>
            <li>Adar Azoulay</li>
        </div>
        {/* Column4 */}
        <div className="listUnstyled">
          <h3>The Computer Store</h3>
            <li>+972-54-5544-961</li>
            <li>Hertzliya, Israel</li>
            <li>Ehad echad ha'am st</li>
            <div className={classes.icons}>
                <FacebookIcon className={classes.icon}/>
                <InstagramIcon className={classes.icon}/>
                <TwitterIcon className={classes.icon}/>
            </div>
        </div>
      </div>
      <hr />
      <div className={classes.colS}>
        {new Date().getFullYear()} The Computer Store | All rights reserved |
        Terms Of Service | Privacy
      </div>
    </div>
  );
};

export default Footer;
