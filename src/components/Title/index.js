import '../../assets/sass/title.css'

export default function Title({children, name}){
    return(
        <div id="Title">
            {children}
            <span>{name}</span>
        </div>
    )
}