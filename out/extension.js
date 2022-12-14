"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "php-unserialize" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('php-unserialize.unserialize', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World from PHP Unserialize!');
        const activeTextEditor = vscode.window.activeTextEditor;
        if (!activeTextEditor) {
            vscode.window.showInformationMessage("No serialize data selected.");
            return;
        }
        const serializeData = activeTextEditor.document.getText(activeTextEditor.selection);
        if (!serializeData) {
            vscode.window.showInformationMessage("No serialize data selected.");
            return;
        }
        const quote = "'\\''";
        let command = "php -r 'print_r( unserialize( " + quote + serializeData + quote + " ) );'";
        const spawn = require("child_process").spawn;
        const process = spawn(command, [], { shell: true });
        process.stdout.on("data", (data) => {
            const unserializeData = data.toString();
            activeTextEditor.edit(editBuilder => {
                editBuilder.replace(activeTextEditor.selection, unserializeData);
            });
        });
        process.stderr.on("data", (data) => {
            const unserializeData = data.toString();
            activeTextEditor.edit(editBuilder => {
                editBuilder.replace(activeTextEditor.selection, unserializeData);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map