import classes from "./nav.module.css";
import { BiSolidDashboard, BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineLogin } from "react-icons/ai";
import { RiPassValidLine } from "react-icons/ri";
import { BsTable } from "react-icons/bs";
import { Fragment } from "react";
import { Link } from "react-router-dom"; 

export default function Nav() {
  return (
    <Fragment>
      <div className={classes.container}>
        <h2 className={classes.heading}>
          <BiSolidDashboard />
          Admin Dashboard
        </h2>
        <nav className={classes.navbar}>
          <Link to="/login" className={classes.link}>
            <AiOutlineLogin /> Log In
          </Link>
          <Link to="/" className={classes.link}>
            <BiHomeAlt2 /> Home
          </Link>
          <Link to="/main" className={classes.link}>
            <RiPassValidLine /> Validate
          </Link>
          <Link to="/table" className={classes.link}>
            <BsTable /> Table
          </Link>
        </nav>
      </div>
    </Fragment>
  );
}
