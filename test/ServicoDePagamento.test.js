import ServicoDePagamento from '../src/ServicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Serviço de Pagamento', () => {
    it('Validar que o pagamento é adicionado na lista de pagamentos', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '0987-7656-3475');
        assert.equal(ultimoPagamento.empresa, 'Samar');
        assert.equal(ultimoPagamento.valor, 156.87);
        assert.equal(ultimoPagamento.categoria, 'cara');
    });

    it('Validar que a categoria é "cara" quando valor é maior que 100.00', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('1234-5678-9012', 'Caue LTDA', 100.01);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.categoria, 'cara');
        assert.equal(ultimoPagamento.valor, 100.01);
    });

    it('Validar que a categoria é "padrão" quando valor é menor que 100.00', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('2002-0427-0000', 'Julio LTDA', 99.99);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.categoria, 'padrão');
        assert.equal(ultimoPagamento.valor, 99.99);
    });

    it('Validar que a categoria é "padrão" quando valor é exatamente 100.00', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('1111-2222-3333', 'Diana LTDA', 100.00);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.categoria, 'padrão');
        assert.equal(ultimoPagamento.valor, 100.00);
    });

    it('Validar que consultarUltimoPagamento retorna apenas o último pagamento', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('0001-0001-0001', 'Helena LTDA', 33.00);
        servicoDePagamento.pagar('0002-0002-0002', 'Joao LTDA', 431.00);
        servicoDePagamento.pagar('0003-0003-0003', 'Jack LTDA', 55.00);
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '0003-0003-0003');
        assert.equal(ultimoPagamento.empresa, 'Jack LTDA');
        assert.equal(ultimoPagamento.valor, 55.00);
        assert.equal(ultimoPagamento.categoria, 'padrão');
    });
});
