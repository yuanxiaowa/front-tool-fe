export var getAData = ({ data: { code, data, msg } }) => {
    if (code === 0) {
        return data;
    }
    throw msg;
};
