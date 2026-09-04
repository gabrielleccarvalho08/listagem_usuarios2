import UserCardComponent from "./UserCardComponent";

function UserListComponent({ usuarios }) {
    if (usuarios.length === 0) {
        return (
            <p className="nenhum-usuario">
                Nenhum usuário encontrado.
            </p>
        );
    }

    return (
        <ul className="user-list">
            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                />
            ))}
        </ul>
    );
}

export default UserListComponent;