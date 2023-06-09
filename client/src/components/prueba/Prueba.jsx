import React from "react";
const D = (C) => {
    return ({ children }) => (
        <div>
            <span>Foo</span>
            <C>{children}</C>
        </div>
    );
};

class MyClass extends React.Component {
    render() {
        const { children } = this.props;
        return <span>{children}</span>;
    }
}

const X = D(MyClass, 'world');

const Prueba = () => {
    return <X>hello</X>;
};

export default Prueba;
