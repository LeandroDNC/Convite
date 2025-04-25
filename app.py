from flask import Flask, render_template, redirect, url_for, flash, request

app = Flask(__name__)
app.secret_key = 'chave-secreta-super-segura'  # Necessário para sessões e mensagens flash

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        senha = request.form['senha']

        # Simulação de login (você pode integrar com um banco de dados depois)
        if usuario == 'par' and senha == 'par':
           
            return redirect(url_for('dashboard'))
        else:
            flash('Usuário ou senha incorretos!', 'error')
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/painel')
def painel():
    return "<h1>Bem-vindo ao painel do sistema!</h1>"

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run(debug=True)

