import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(0.5, 0.25)
    }
}));

export default function TagsInput({...props}) {
    const classes = useStyles();
    const {placeholder, tags, handleRemove,setTags, handleAdd, ...other} = props;
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState([]);

    useEffect(() => {
        setSelectedItem(tags);
    }, [tags]);

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            const newSelectedItem = [...selectedItem];
            const duplicatedValues = newSelectedItem.indexOf(
                event.target.value.trim()
            );

            if (duplicatedValues !== -1) {
                setInputValue("");
                return;
            }
            if (!event.target.value.replace(/\s/g, "").length) return;

            newSelectedItem.push(event.target.value.trim());
            setSelectedItem(newSelectedItem);
            setTags([...tags, event.target.value.trim()]);
            setInputValue("");
        }
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === "Backspace"
        ) {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleChange(item) {
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue("");
        setSelectedItem(newSelectedItem);
    }

    const handleDelete = item => () => {
       setTags(tags.filter((tag) => tag !== item));
    };

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={handleChange}
                selectedItem={selectedItem}
            >
                {({getInputProps}) => {
                    const {onBlur, onChange, onFocus, ...inputProps} = getInputProps({
                        onKeyDown: handleKeyDown,
                        placeholder
                    });
                    return (
                        <div>
                            <TextField
                                InputProps={{
                                    startAdornment: selectedItem.map(item => (
                                        <Chip
                                            key={item}
                                            tabIndex={-1}
                                            label={item}
                                            className={classes.chip}
                                            onDelete={handleDelete(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: event => {
                                        handleInputChange(event);
                                        onChange(event);
                                    },
                                    onFocus
                                }}
                                {...other}
                                {...inputProps}
                            />
                        </div>
                    );
                }}
            </Downshift>
        </React.Fragment>
    );
}
TagsInput.defaultProps = {
    tags: []
};
TagsInput.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
};
