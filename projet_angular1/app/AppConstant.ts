export class AppConstant {
    static userId = window.localStorage.getItem("id_user");
    static readonly apiUrl: string = 'https://fleet-boundary-production.up.railway.app';
}
