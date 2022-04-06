import React from "react";

function Pagination({ max, actual, onClick }) {
    const pages = [];
    for (let i = 0; i < max + 1; i++) {
        pages.push(i + 1);
    }

    return (
        <>
            <div className="PagesContainer">
                <div className="previousContainer">
                    {actual !== 0 ? (
                        <button name="previous" className="previous" onClick={onClick}>
                            ← Prev
                        </button>
                    ) : null}
                </div>
                <div className="pagesNumberContainer">
                    {pages.map((el) => {
                        if (el === 1) {
                            return (
                                <button className="pageNumbers activeButton" id={el} name={el} onClick={onClick} value={el} key={el}>
                                    {el}
                                </button>
                            );
                        } else {
                            return (
                                <button className="pageNumbers" id={el} name={el} onClick={onClick} value={el} key={el}>
                                    {el}
                                </button>
                            );
                        }
                    })}
                </div>
                <div className="nextContainer">
                    {actual < Math.floor(max - 0.0001) + 1 ? (
                        <button className="next" name="next" onClick={onClick}>
                            Next →
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Pagination;
