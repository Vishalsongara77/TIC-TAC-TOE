

const Square = (prop)=> {
    return (
        <div className="square "
            onClick={prop.onClick}>
            <span className="element">{prop.value}</span>
        </div>
    );
}

export default Square;