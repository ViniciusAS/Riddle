function modal(html){
    $('#fundoEscuro').fadeIn(400);
    $('#modal').html(html);
    $('#modal').fadeIn(400);
}
function msgErro(msg){
    
}
function fimModal(msg){
    if ( msg == '' ){
        $('#fundoEscuro').fadeOut(400);
        $('#modal').fadeOut(400, function(){
            $('#modal').html('');
        });
    } else {
        $('#fundoEscuro').fadeOut(400);
        $('<div>', {
            html: msg,
            css: {
                'display' : 'none',
                'text-align' : 'center'
            },
            id: 'msg',
            appendTo : '#modal'
        });
        $('#modal *').slideUp(400);
        $('#modal div#msg').slideDown(100, function(){
            $('#modal').delay(600).fadeOut(500, function(){
                $('#modal').html('');
            });
        });
    }
}
var carregando = false;
$(function(){
    // Fim Modal
    $('#fundoEscuro').on('click', function(){ if (!carregando) fimModal(''); });
    $('#modal input[type="reset"]').live('click', function(){ if (!carregando) fimModal(''); });
    $('#modal #fecharModal').live('click', function(){ if (!carregando) fimModal(''); });
    $('#cadastre-se').on('click', function(){
        if (!carregando) {
            modal('\n\
                    <form method="post" action="proccess/cad.php" id="cadastro">\n\
                        <h2>Cadastre-se</h2>\n\
                        <table>\n\
                            <tr>\n\
                                <td>\n\
                                    Nome:\n\
                                </td>\n\
                                <td>\n\
                                    <input type="text" placeholder="Seu nome completo" name="nome" />\n\
                                </td>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>\n\
                                    Sexo: \n\
                                </td>\n\
                                <td>\n\
                                    <select name="sexo">\n\
                                        <option value=""></option>\n\
                                        <option value="M">\n\
                                            Masculino\n\
                                        </option>\n\
                                        <option value="F">\n\
                                            Feminino\n\
                                        </option>\n\
                                    </select>\n\
                                </td>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>\n\
                                    E-Mail:\n\
                                </td>\n\
                                <td>\n\
                                    <input type="text" placeholder="E-Mail" name="email" />\n\
                                </td>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>\n\
                                    Usuário:\n\
                                </td>\n\
                                <td>\n\
                                    <input type="text" placeholder="Usuário"  name="login" />\n\
                                </td>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>\n\
                                    Senha:\n\
                                </td>\n\
                                <td>\n\
                                    <input type="password" placeholder="Senha" name="senha" />\n\
                                </td>\n\
                            </tr>\n\
                            <tr>\n\
                                <td>\n\
                                    Confirmação de senha:\n\
                                </td>\n\
                                <td>\n\
                                    <input type="password" placeholder="Confirmação de senha" name="confSenha" />\n\
                                </td>\n\
                            </tr>\n\
                        </table>\n\
                        <img src="img/load.gif" style="float: right;" />\n\
                        <input type="submit" value="Cadastrar-se" />\n\
                        <input type="reset" value="Cancelar">\n\
                    </form>\n\
                    ');
        }
    });
    $('form#cadastro').live('submit', function(e){
        e.preventDefault();
        if (!carregando){
            var form = this;
            carregando = true;
            $(form).find('input[type="text"], input[type="password"]').each(function(){
                $(form).attr('readonly', 'readonly');
            });
            $(form).find('select').find('option').not(':selected').each(function(){
                $(this).remove('');
            });
            var opSel = $(form).find('select').find('option:selected').attr('value');
            $(form).find('input[type="submit"], input[type="reset"]').attr('disabled', 'disabled');
            $(form).find('img').toggle(400);
            $.post('process/cad.php', $('#cadastro').serialize(), function(ret){
                carregando = false;
                if (ret == 1){
                    fimModal('Cadastrado com sucesso');
                } else {
                    $(form).find('input[type="text"], input[type="password"]').each(function(){
                        $(form).removeAttr('readonly');
                    });
                    var select = '<option value=""></option>';
                    select += '<option value="M"';
                        if (opSel == 'M') select += ' selected="selected"';
                    select += '> Masculino </option>';
                    select += '<option value="F"';
                        if (opSel == 'F') select += ' selected="selected"';
                    select += '> Feminino </option>';
                    $(form).find('select').html(select);
                    $(form).find('input[type="submit"], input[type="reset"]').removeAttr('disabled');
                    $(form).find('img').toggle(400);
                }
            });
        }
    });
});