// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("gnittep.petsView", new PetWebviewer(context.extensionUri))
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('gnittep.addPet', () => {
			vscode.window.showInformationMessage('Add pet clicked');
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}

class PetWebviewer implements vscode.WebviewViewProvider {
	private mediaPath: vscode.Uri;
	private htmlPath: vscode.Uri;

	constructor(private readonly extensionUri: vscode.Uri) {
		this.mediaPath = vscode.Uri.joinPath(extensionUri, "media");
		this.htmlPath = vscode.Uri.joinPath(this.mediaPath, "index.html");
	}

	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
		const cssUri = webviewView.webview.asWebviewUri(
			vscode.Uri.joinPath(this.mediaPath, "main.css")
		);
		const jsUri = webviewView.webview.asWebviewUri(
			vscode.Uri.joinPath(this.mediaPath, "main.js")
		);
		const html = fs.readFileSync(this.htmlPath.fsPath, 'utf8')
					   .replaceAll('{{cssUri}}', cssUri.toString())
					   .replaceAll('{{jsUri}}', jsUri.toString())
					   .replaceAll('{{mediaUri}}', webviewView.webview.asWebviewUri(this.mediaPath).toString());

		webviewView.webview.options = { 
			enableScripts: true,
			localResourceRoots: [this.mediaPath]
		};
		webviewView.webview.html = html;
	}
}