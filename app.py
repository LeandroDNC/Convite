from flask import Flask, render_template, redirect, url_for, flash, request

app = Flask(__name__)
app.secret_key = 'chave-secreta-super-segura'  # Necessário para sessões e mensagens flash

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        senha = request.form['senha']

        # Simulação de login (você pode integrar com um banco de dados depois)
        if usuario == 'teste' and senha == 'teste':
            flash('Login bem-sucedido!', 'success')
            return redirect(url_for('painel'))
        else:
            flash('Usuário ou senha incorretos!', 'error')
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/painel')
def painel():
    return "<h1>Bem-vindo ao painel do sistema!</h1>"

if __name__ == '__main__':
    app.run(debug=True)

