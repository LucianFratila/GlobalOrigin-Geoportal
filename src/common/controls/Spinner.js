const Spinner = ({isLoading}) => (
    <div className={isLoading ? "spinner-border my_spinner" : "spinner-border my_spinner d-none"} role="status" id="loading_spinner" >
        <span className="sr-only"></span>
    </div>
)

export default Spinner