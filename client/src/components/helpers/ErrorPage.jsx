import React from "react";

function ErrorPage() {
    return (
        <div className="ErrorContainer">
            <div className="errorPokedex">
                <div className="errorScreen"></div>
                <div className="errorMsgContainer">
                    <div className="errorMsg">Pokemon not Found</div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
