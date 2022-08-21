describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update serverTable on updateServerTable()', function() {
    submitServerInfo();
    updateServerTable();

    let currentTds = document.querySelectorAll('#serverTable tbody tr td');

    expect(currentTds.length).toEqual(3);
    expect(currentTds[0].innerText).toEqual('Alice');    
    expect(currentTds[1].innerText).toEqual('$0.00');
    expect(currentTds[2].innerText).toEqual('X');
  })

  it('should not add a new server on submitServerInfo() if there is no name inputted', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  afterEach(function() {
    // teardown logic
    serverId = 0
    serverTbody.innerHTML = ''
    allServers = {};
  });
});
