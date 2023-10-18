// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let NEXT_TERM_ID = 1;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "havi-plop-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('havi.yarn.generate', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('havi-plop-generator!');
	// 	const terminal = vscode.window.createTerminal(`Havi-Terminal #${NEXT_TERM_ID++}`);
	// 	terminal.show();
	// 	terminal.sendText("yarn generate");
	// });

	// context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('havi.yarn.generate', (folder: vscode.Uri) => {
		createTerminal(folder, NEXT_TERM_ID).sendText("yarn generate");
	}));
	context.subscriptions.push(vscode.commands.registerCommand('havi.yarn.start', (folder: vscode.Uri) => {
		createTerminal(folder, NEXT_TERM_ID).sendText("yarn start");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('havi.yarn.build', (folder: vscode.Uri) => {
		createTerminal(folder, NEXT_TERM_ID).sendText("yarn build");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('havi.yarn.test', (folder: vscode.Uri) => {
		createTerminal(folder, NEXT_TERM_ID).sendText("yarn test");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('havi.yarn.test.file', (uri: vscode.Uri) => {
		if (uri.fsPath.split('\\').pop() && uri.fsPath.split('\\').pop()?.endsWith('spec.tsx') || uri.fsPath.split('\\').pop()?.endsWith('spec.tsx')) {
			createFileTerminal(uri, NEXT_TERM_ID).sendText(`yarn test ${uri.fsPath.split('\\').pop()} --u`);
		}
	}));
}

const createTerminal = (folder: vscode.Uri, terminalId: number): vscode.Terminal => {
	vscode.window.showInformationMessage('HAVI yarn generate triggered');
	//const dirName = path.dirname(folder.fsPath);
	const folderPathParsed = folder.fsPath.substring(0, folder.fsPath.lastIndexOf('\\'));
	const terminal = vscode.window.createTerminal(`Havi-Terminal #${terminalId++}`);
	terminal.show();
	// Change directory to the selected folder
	terminal.sendText(`cd "${folder.fsPath}"`);
	return terminal;
};

const createFileTerminal = (folder: vscode.Uri, terminalId: number): vscode.Terminal => {
	vscode.window.showInformationMessage('HAVI yarn generate triggered');	
	const folderPathParsed = folder.fsPath.substring(0, folder.fsPath.lastIndexOf('\\'));
	const terminal = vscode.window.createTerminal(`Havi-Terminal #${terminalId++}`);
	terminal.show();
	// Change directory to the selected folder
	if (folder.fsPath.split('\\').pop() && folder.fsPath.split('\\').pop()?.endsWith('spec.tsx') || folder.fsPath.split('\\').pop()?.endsWith('spec.ts'))
	{ 
		terminal.sendText(`cd "${folderPathParsed}"`); 
	}
	else { terminal.sendText(`cd "${folder.fsPath}"`); }
	return terminal;
};

// This method is called when your extension is deactivated
export function deactivate() { }
