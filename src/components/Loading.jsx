import PropTypes from "prop-types";

const Loading = ({message}) => {
    return (
        <div className=" flex justify-center text-center flex-col">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto mt-8"></div>
            <p className="text-center text-gray-500 mt-2">{message}</p>
        </div>
    );
}

Loading.propTypes = {
    message: PropTypes.string
}

export default Loading