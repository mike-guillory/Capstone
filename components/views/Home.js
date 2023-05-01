import html from "html-literal";

export default () => html`
<main>
    <div id="loginDiv">
      <form id="login" action="">
        <label for="user">User Name: </label><input name="user" type="text"><br><br>
        <label for="password">Password: </label><input name="password" type="password"><br><br>
        <input type="submit">
      </form>
    </div>
</main>
`;

