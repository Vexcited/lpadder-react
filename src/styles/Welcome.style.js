const styles = {
    mainContainer: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    leftSide: {
        flex: "2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    rightSide: {
        height: "100vh",
        flex: "3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "black"
    },
    title: {
        fontFamily: "Arvo",
        fontSize: "5rem",
        margin: "5% 20%"
    },
    subtext: {
        fontFamily: "Roboto",
        margin: "5% 0"
    },
    link: {
        color: "red"
    },
    newProjectButton: {
        background: "white",
        color: "black",
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        margin: "5px"
    },
    importProjectButton: {
        background: "black",
        color: "white",
        borderRadius: 3,
        border: "solid 2px white",
        height: 48,
        padding: '0 30px',
        margin: "5px"
    },
    alreadyOpenedProjectButton: {
        background:  "white",
        color: "black",
        borderRadius: 0,
        marginBottom: 10,
        width: "100%",
        boxShadow: "unset",
        padding: "10px 0"
    },
    rightIconButton: {
        marginLeft: 8
    }
}

export default styles;