function UserCardComponent({ usuario }) {
    return (
        <li className="user-card">
            <h2>{usuario.name}</h2>

            <p>
                <strong>Usuário:</strong> {usuario.username}
            </p>

            <p>
                <strong>E-mail:</strong> {usuario.email}
            </p>
        </li>
    );
}

export default UserCardComponent;