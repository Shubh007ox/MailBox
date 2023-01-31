import React from "react";

import MailboxNavbar from "../Component/store/navBar";

const Layout = (props) => {
    return (
        <React.Fragment>
            <MailboxNavbar />
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default Layout;