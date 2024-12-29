export function verifyPermitions(actions: string[]) {

    return function (actionToCheck: string): boolean {
        return actions.includes(actionToCheck);
    };
}