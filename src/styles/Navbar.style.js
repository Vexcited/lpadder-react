import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabs: {
        color: "white",

        "& div + span": {
            backgroundColor: "#e6e6e6"
        }
    },
    appBar: {
        backgroundColor: "#262626"
    }
}));

export default useStyles;