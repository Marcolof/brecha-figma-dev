"""Importa la auditoría dev vs Figma (06/11, reverificada 10/11) al catálogo del Hub.

Uso: python -I import_flujo.py <carpeta pant> <carpeta capturas dev> <carpeta diferencias>
Cada lado se recorta alrededor de sus rectángulos (con contexto) y los rectángulos
se recalculan en % del recorte.
"""
import json
import os
import sys

from PIL import Image

PANT, CAP, DIF = sys.argv[1:4]
OUT = os.path.join(DIF, 'img', 'flujo')
os.makedirs(OUT, exist_ok=True)

FIG = {  # pantalla -> (archivo, nodo)
    'info-sin': ('info-sin.png', '14469:65168'),
    'decl-vacia': ('decl-vacia.png', '11695:15224'),
    'decl-art': ('decl-art.png', '11695:15088'),
    'art-vuce': ('art-vuce.png', '14908:4082'),
    'paquete': ('paquete.png', '11695:15272'),
    'origen': ('origen.png', '11695:15612'),
    'destino': ('destino.png', '11695:15365'),
    'com-decl': ('com-decl.png', '11695:15835'),
    'com-info': ('com-info.png', '14459:53985'),
    'com-origen': ('com-origen.png', '11695:16283'),
    'com-destino': ('com-destino.png', '11695:16071'),
    'modal-repr': ('modal-repr.png', '11695:16325'),
    'sin-repr': ('sin-repr.png', '11695:16185'),
}
DEV = {
    '01': 'dev-01-declaracion-al-entrar.jpg', '02': 'dev-02-switch-comercial-sin-modal.jpg',
    '03': 'dev-03-modal-info-comercial.jpg', '05': 'dev-05-select-categoria.jpg',
    '06': 'dev-06-agregar-articulo-inicial.jpg', '08': 'dev-08-agregar-articulo-seleccion.jpg',
    '09': 'dev-09-agregar-articulo-peso-029.jpg', '10': 'dev-10-declaracion-con-articulo.jpg',
    '11': 'dev-11-declaracion-pie.jpg', '14': 'dev-14-paquete-completo.jpg', '15': 'dev-15-origen.jpg',
    '16': 'dev-16-destino-arriba.jpg', '17': 'dev-17-destino-servicio-guardar.jpg',
    '22': 'dev-22-comercial-destino-representacion.jpg', '24': 'dev-24-sin-representacion-asistire-yo.jpg',
    '25': 'dev-25-comercial-origen-casillas.jpg', '26': 'dev-26-comercial-categoria-flecha-1011.jpg',
    '28': 'dev-28-peso-rueda-029-1011.jpg', '29': 'dev-29-modal-representacion-1011.jpg',
}


def crop_side(src, boxes, name, full=False, ext='png'):
    """Recorta alrededor de los rectángulos y devuelve (archivo, highlights en % del recorte)."""
    im = Image.open(src).convert('RGB')
    W, H = im.size
    if full or not boxes:
        x0, y0, x1, y1 = 0, 0, W, H
    else:
        bx0 = min(b[0] for b in boxes) / 100 * W
        by0 = min(b[1] for b in boxes) / 100 * H
        bx1 = max(b[0] + b[2] for b in boxes) / 100 * W
        by1 = max(b[1] + b[3] for b in boxes) / 100 * H
        padx, pady = 0.10 * W, 0.08 * H
        x0, y0, x1, y1 = bx0 - padx, by0 - pady, bx1 + padx, by1 + pady
        minw, minh = 0.38 * W, 0.22 * H  # contexto mínimo
        if x1 - x0 < minw:
            c = (x0 + x1) / 2
            x0, x1 = c - minw / 2, c + minw / 2
        if y1 - y0 < minh:
            c = (y0 + y1) / 2
            y0, y1 = c - minh / 2, c + minh / 2
        if x0 < 0:
            x1, x0 = x1 - x0, 0
        if y0 < 0:
            y1, y0 = y1 - y0, 0
        x1, y1 = min(x1, W), min(y1, H)
        x0, y0, x1, y1 = int(x0), int(y0), int(x1), int(y1)
    c = im.crop((x0, y0, x1, y1))
    cw, ch = c.size
    fn = f'{name}.{ext}'
    if ext == 'jpg':
        c.save(os.path.join(OUT, fn), quality=88)
    else:
        c.save(os.path.join(OUT, fn), optimize=True)
    hl = []
    for b in boxes:
        bx, by = b[0] / 100 * W - x0, b[1] / 100 * H - y0
        hl.append({'x': round(bx / cw * 100, 1), 'y': round(by / ch * 100, 1),
                   'w': round(b[2] / 100 * W / cw * 100, 1), 'h': round(b[3] / 100 * H / ch * 100, 1)})
    return 'img/flujo/' + fn, hl


SEV = {'A': 'alta', 'M': 'media', 'B': 'baja'}
ST = {'C': 'abierta', 'X': 'a-confirmar'}
SRC_NOTE = 'Auditoría dev vs Figma del 06/11/2026, reverificada el 10/11/2026 (DIFERENCIAS-DEV-VS-FIGMA.md).'

# (code, category, group, title, summary, sev, estado,
#  figma: (pantalla, [boxes], full) o None, dev: (captura, [boxes], full) o None,
#  figma_txt, dev_txt, detalle opcional)
D = [
    # --- General
    ('GEN-02', 'visuales', 'General', 'Los campos son más bajos', 'En dev los campos miden 38 px de alto; en Figma, 42 px.', 'B', 'C',
     ('decl-vacia', [[7, 19.5, 44, 5]], False), ('01', [[6, 27, 35, 4]], False),
     '42 px de alto.', '38 px de alto. La columna del formulario sí mide 600 px, como en Figma.', None),
    # --- Declaración
    ('DEC-01', 'funcionales', 'Declaración', 'El modal «Información a tener en cuenta» no se abre al entrar',
     'En Figma el modal se abre solo al elegir Internacional; en dev la pantalla carga sin el modal.', 'A', 'C',
     ('info-sin', [[28, 32, 44, 36]], True), ('01', [[5, 42, 16, 5]], True),
     'Se abre solo al elegir Internacional; el enlace lo vuelve a abrir.', 'La pantalla carga sin el modal; sólo se abre desde el enlace «Información a tener en cuenta».',
     'No se pudo probar el ida y vuelta Nacional → Internacional, porque la pestaña «Nacional» sale del ambiente (AMB-04).'),
    ('DEC-02', 'funcionales', 'Declaración', 'El modal comercial no se abre al activar «Envío con fines comerciales»',
     'En Figma, activar el interruptor abre el modal con las condiciones comerciales; en dev no aparece ningún modal.', 'A', 'C',
     ('com-info', [[28, 19, 42, 62]], True), ('02', [[5, 37, 37, 5]], True),
     'Se abre solo el modal con las condiciones comerciales (AFU HU-03).', 'Se activa el interruptor y la categoría pasa a «Venta de mercadería», pero no aparece ningún modal.', None),
    ('DEC-03', 'visuales', 'Declaración', 'El interruptor de fines comerciales está en la versión anterior',
     'Dev muestra la versión 1 (leyenda e interruptor a la derecha); Figma ya usa la versión 2 (interruptor a la izquierda con «No»/«Sí»).', 'M', 'C',
     ('decl-vacia', [[7, 30, 22, 7]], False), ('01', [[6, 37, 36, 6]], False),
     'Versión 2: etiqueta en 16 px Medium; abajo, el interruptor a la izquierda con «No»/«Sí». Sin leyenda.',
     'Leyenda «Solo disponible desde sucursales con asiento aduanero.» e interruptor a la derecha; etiqueta en 14 px.', None),
    ('DEC-04', 'visuales', 'Declaración', 'Con fines comerciales sigue visible «Detallá la categoría…»',
     'Dev muestra el texto «Detallá la categoría del envío y el contenido del paquete.», que no está en la Declaración comercial de Figma.', 'B', 'C',
     ('com-decl', [[7, 38.5, 45, 2.5]], False), ('26', [[6, 44.5, 23, 3]], False),
     'Ese texto no aparece en la Declaración comercial.', 'Se ve «Detallá la categoría del envío y el contenido del paquete.».', None),
    ('DEC-06', 'visuales', 'General', 'El título «Nuevo envío | Paquetería» es más grande', 'Dev usa 28 px SemiBold; Figma, 24 px Medium.', 'B', 'C',
     ('decl-vacia', [[6.5, 6.5, 23, 5]], False), ('01', [[6, 8.5, 22, 5]], False), '24 px Medium.', '28 px SemiBold.', None),
    ('DEC-07', 'visuales', 'Declaración', 'La pestaña «Masivo» está en negrita', 'Dev usa peso 500; Figma, regular (400).', 'B', 'C',
     ('decl-vacia', [[15, 11.5, 6, 4]], False), ('01', [[15.5, 13.5, 5, 4]], False), 'Regular (400).', 'Peso 500.', None),
    ('DEC-08', 'visuales', 'Declaración', 'Los textos de ejemplo de los selectores son más chicos', '«País de destino» y «Categoría de envío» en 14 px en dev; 16 px en Figma.', 'B', 'C',
     ('decl-vacia', [[7, 19.5, 44, 5]], False), ('01', [[6, 27, 35, 4]], False), '16 px Regular.', '14 px.', None),
    ('DEC-09', 'visuales', 'Declaración', 'El rango geográfico está en plural y sin negrita', 'Dev dice «Países Limítrofes» sin negrita; Figma, «País limítrofe» con el valor en negrita.', 'B', 'C',
     ('decl-art', [[6.5, 19.3, 17, 3]], False), ('10', [[6, 31, 15, 3.5]], False),
     '«Rango geográfico: País limítrofe», con el valor en negrita.', '«Rango geográfico: Países Limítrofes», todo en peso regular.', None),
    ('DEC-10', 'visuales', 'Declaración', 'A la tarjeta del artículo le falta la unidad de medida', 'La tarjeta de dev no tiene la fila «Unidad de medida» y usa textos de 14 px.', 'B', 'C',
     ('decl-art', [[8, 55.3, 43, 3]], False), ('10', [[6, 72, 35, 23]], False),
     'Incluye «Unidad de medida»; textos en 16 px (AFU HU-05).', 'Sin la fila «Unidad de medida»; textos en 14 px.', None),
    ('DEC-11', 'visuales', 'Declaración', 'El modal comercial muestra enlaces y URL distintos',
     'En dev los enlaces dicen «clic aquí», el de VUCE se ve como URL y el modal necesita desplazamiento.', 'B', 'C',
     ('com-info', [[30, 48, 40, 5.5]], False), ('03', [[33.5, 64, 11, 3.5], [66.6, 13, 1.5, 72]], False),
     'Todos los enlaces dicen «(hacé click acá)». Mide 685 px.', 'Los enlaces dicen «clic aquí» y el de VUCE se ve como URL. Mide 723 px de alto y necesita desplazamiento.', None),
    ('DEC-12', 'visuales', 'Declaración', 'Con fines comerciales, la categoría bloqueada muestra la flecha de lista',
     'Dev muestra «Venta de mercadería» como lista deshabilitada, con flecha; Figma, como campo de sólo lectura.', 'B', 'C',
     ('com-decl', [[7, 40, 44.5, 5.5]], False), ('26', [[6, 49.5, 35, 4.5]], False),
     'Campo de sólo lectura, sin flecha.', '«Venta de mercadería» aparece como lista deshabilitada, con flecha.', None),
    # --- Agregar artículo
    ('ART-01', 'funcionales', 'Modal «Agregar artículo»', 'El modal es el anterior, de un solo paso',
     'Figma define dos pasos (clasificación arancelaria con VUCE y datos del artículo); dev tiene un solo formulario con «Limpiar».', 'A', 'C',
     ('art-vuce', [[8, 13.5, 84, 6]], False), ('06', [[32, 10, 37, 82]], True),
     'Dos pasos: (1) clasificación arancelaria con sugerencias de VUCE y niveles; (2) datos del artículo, con «Atrás» y «Agregar». Sin «Limpiar». El aviso está en el tooltip del ícono ⓘ.',
     'Descripción, código, cantidad, precio y peso en un mismo formulario. Botones «Cancelar», «Limpiar» y «Agregar». El aviso de responsabilidad está en un recuadro gris siempre visible.', None),
    ('ART-02', 'funcionales', 'Modal «Agregar artículo»', 'No se puede llegar a la posición arancelaria final',
     'En dev el código queda en 4 dígitos (61.09); Figma baja por niveles hasta la posición final de 11 dígitos más letra.', 'A', 'C',
     ('art-vuce', [[8, 40, 84, 48]], False), ('08', [[34, 43, 33, 5]], False),
     'La sugerencia abre los niveles, de a uno; «Volver» sube un nivel. La posición final (11 dígitos + letra) se elige con un radio. «Siguiente» se habilita sólo con una posición final.',
     'Al elegir una sugerencia, el código queda en 4 dígitos (61.09) y no hay forma de bajar a una posición más precisa.', None),
    ('ART-03', 'funcionales', 'Modal «Agregar artículo»', 'La descripción del usuario se reemplaza por la de VUCE',
     'Lo que escribió el usuario («Remera») se reemplaza por el texto de VUCE en la tarjeta del artículo.', 'M', 'X',
     ('decl-art', [[7, 50.5, 18, 3.5]], False), ('10', [[7, 71.5, 28, 4]], False),
     'La tarjeta muestra la descripción del usuario («Remera de algodón»), separada de la posición.',
     'La tarjeta muestra el texto de VUCE («"T-SHIRTS" Y CAMISETAS, DE PUNTO.»).', 'Es la duda D-01 de la definición funcional: qué descripción se guarda.'),
    ('ART-04', 'funcionales', 'Modal «Agregar artículo»', '«Agregar» está siempre habilitado',
     'En dev «Agregar» se puede tocar con campos vacíos; en Figma «Siguiente» se habilita sólo con una posición final.', 'B', 'X',
     ('art-vuce', [], True), ('06', [[58.5, 85.5, 9, 5]], False),
     'En el paso 1, «Siguiente» se habilita sólo con una posición final. No se ve el estado de error del paso 2.',
     'Con campos vacíos marca los campos en rojo y muestra «Completá todos los campos obligatorios…».', None),
    # --- Paquete
    ('PAQ-01', 'funcionales', 'Paquete', 'El peso aforado repite el peso real',
     'Dev muestra como aforado el mismo peso ingresado; el AFU lo calcula con largo × ancho × alto / 6000.', 'M', 'X',
     ('paquete', [[7, 66, 37, 4]], False), ('14', [[6, 59, 36, 4]], False),
     'Aforado = largo × ancho × alto / 6000 (AFU §3): para 45 × 35 × 25 cm da 6,56 kg. El ejemplo de Figma también lo calcula.',
     '«Peso Total Aforado» muestra el peso ingresado (1 kg y 2 kg con 45 × 35 × 25 cm).', 'Falta confirmar si el aforado aplica a Encomienda o sólo a EMS Mercadería (P6).'),
    ('PAQ-02', 'visuales', 'Paquete', '«Guardar medida» se ve como un botón del navegador', 'Dev usa un botón nativo gris con borde; Figma, un enlace azul.', 'M', 'C',
     ('paquete', [[33, 48, 10, 3.5]], False), ('14', [[34.5, 39, 6.5, 3.5]], False), 'Enlace azul alineado a la derecha.', 'Botón nativo, gris y con borde.', None),
    ('PAQ-03', 'visuales', 'Paquete', 'Los rótulos de peso y la ayuda del peso máximo son distintos', 'Cambian los textos de los rótulos y el peso máximo pasa de ayuda a fila.', 'B', 'C',
     ('paquete', [[7, 56.5, 37, 13.5]], False), ('14', [[6, 50, 36, 12.5]], False),
     '«Peso total de artículos declarados» y «Peso total aforado:»; «Peso máximo…» es una ayuda de 12 px bajo el campo.',
     '«Peso Total de Artículos» y «Peso Total Aforado»; «Peso máximo…» es una fila de 16 px.', None),
    ('PAQ-04', 'visuales', 'Paquete', 'El producto EMS tiene otro nombre', 'Dev dice «Encomienda EMS (Hasta 20kg)»; Figma y el AFU, «Mercadería EMS (Hasta 20kg)».', 'B', 'X',
     ('paquete', [[7, 37, 17, 3.5]], False), ('14', [[6, 25.5, 35, 4.5]], False),
     '«Mercadería EMS (Hasta 20kg)», también en el AFU HU-09.', '«Encomienda EMS (Hasta 20kg)».', 'Está en consulta con el cliente (D9, nombre del producto EMS).'),
    ('PAQ-05', 'visuales', 'Paquete', 'Los campos de Paquete son más anchos', 'En dev producto y peso miden 600 px; en Figma, 480 px.', 'B', 'C',
     ('paquete', [[7, 24.5, 36, 4.5]], False), ('14', [[6, 25.5, 35, 4.5]], False), '480 px.', 'Producto y peso del paquete miden 600 px, igual que en Declaración.', None),
    # --- Origen
    ('ORI-01', 'visuales', 'Origen', 'Los encabezados y el rótulo de la dirección de devolución son distintos',
     'Dev usa «Origen» y «Remitente» como encabezados; Figma sin fines usa «Remitente» y el selector «Dirección de devolución».', 'M', 'C',
     ('origen', [[7, 21, 27, 24]], False), ('15', [[6, 18.5, 26, 25]], False),
     'Sin fines: encabezado «Remitente» sobre el nombre; el selector se llama «Dirección de devolución» (AFU HU-10). Comercial: encabezado «Origen» y selector «Remitente».',
     'En los dos flujos: encabezado «Origen» sobre el nombre; después, encabezado «Remitente» con texto explicativo y un selector también llamado «Remitente».',
     'Las dos pantallas de Figma (sin fines y comercial) no coinciden entre sí: hay que elegir una antes de pedir el cambio.'),
    ('ORI-02', 'funcionales', 'Origen', 'Con fines comerciales aparecen las casillas para recordar remitente y sucursal',
     'Dev muestra «Utilizar este remitente / esta sucursal para próximos envíos» también en el flujo comercial; Figma no las tiene ahí.', 'M', 'X',
     ('com-origen', [[7, 36.5, 27, 4.5], [7, 54, 27, 4.5]], False), ('25', [[6, 45.5, 24, 6], [6, 69.5, 24, 6]], False),
     'La pantalla comercial no tiene esas casillas. El AFU (HU-10) permite guardar remitente y sucursal sin distinguir el flujo.',
     '«Utilizar este remitente para próximos envíos internacionales» y «Utilizar esta sucursal…», igual que sin fines.', None),
    ('ORI-03', 'visuales', 'Origen', 'El mapa tiene otro tamaño', 'En dev el mapa mide 407 × 298 px; en Figma, 355 × 262 px.', 'B', 'C',
     ('origen', [[34.5, 29.5, 26.5, 33]], False), ('15', [[27, 19, 27, 38]], False), '355 × 262 px.', '407 × 298 px, con la atribución de OpenStreetMap a la vista.', None),
    # --- Destino
    ('DES-01', 'funcionales', 'Destino', 'El código postal no tiene ayuda ni formato según el país', 'Figma muestra «ZIP Code · Ej.: 33101» con formato según el país; dev, un campo sin ayuda.', 'M', 'C',
     ('destino', [[32.5, 50, 19.5, 6]], False), ('16', [[24.5, 75.5, 17, 5]], False),
     '«ZIP Code · Ej.: 33101», con formato según el país (AFU HU-12 y P7).', 'Campo sin ayuda.', 'La validación del formato no se probó.'),
    ('DES-02', 'funcionales', 'Destino', 'Hay un campo «N.º de orden (opcional)» que no está en Figma', 'Dev agrega el campo en Destinatario; no existe ni en Figma ni en el AFU.', 'B', 'X',
     ('destino', [[7, 14.5, 45, 4]], False), ('16', [[32.5, 22, 9, 3.5]], False),
     'No existe ni en Figma ni en el AFU.', 'El campo aparece en Destinatario.', 'Puede ser un pedido de negocio que no llegó a Figma.'),
    ('DES-03', 'funcionales', 'Destino', 'El código de teléfono arranca en Argentina y no en el país de destino', 'Con destino Chile, dev arranca en +54; Figma lo precarga según el país.', 'B', 'C',
     ('destino', [[7, 21.5, 22, 4]], False), ('16', [[6, 32.5, 18.5, 5]], False),
     '«Precargado según el país; editable» (AFU HU-11). En Figma arranca con +593 (Ecuador).', 'Arranca en +54 con destino Chile.', None),
    ('DES-04', 'funcionales', 'Destino', 'El servicio preseleccionado no corresponde al producto elegido',
     'Sin fines, con «Encomienda» elegido, dev ofrece y preselecciona sólo «EMS Documentación».', 'M', 'C',
     ('destino', [[7, 74, 45, 8]], False), ('17', [[6, 75.5, 36, 10]], False),
     'El producto define el servicio preseleccionado: Encomienda → Encomienda Internacional (AFU HU-09 y HU-13).',
     'Sin fines comerciales, con «Encomienda» elegido en Paquete, se ofrece y preselecciona sólo «EMS Documentación». Con fines comerciales sí preselecciona «Encomienda Internacional».',
     'El ejemplo de Figma también muestra EMS Documentación: el error está en la regla y no en el diseño.'),
    ('DES-05', 'visuales', 'Destino', 'La ayuda del teléfono y el rótulo del país son distintos', 'Cambian la ayuda del teléfono y el rótulo «País de destino».', 'B', 'C',
     ('destino', [[29.5, 25, 12, 2.5], [7, 40.5, 45, 4.5]], False), ('16', [[24.5, 38, 15, 3.5], [6, 61.5, 36, 7]], False),
     '«Ej.: 30 12345678» y «País de destino seleccionado:».', '«Solo números, sin espacios ni guiones» y «País de destino».', None),
    ('DES-06', 'visuales', 'Destino', 'Cada tarjeta de servicio postal muestra dos radios', 'Dev muestra un radio nativo y otro con estilo; Figma, uno solo.', 'M', 'C',
     ('destino', [[7.5, 76.5, 3, 3]], False), ('17', [[6.5, 76.5, 4.5, 4]], False), 'Un solo radio.', 'Uno nativo y otro con estilo.', None),
    ('DES-07', 'visuales', 'Destino', 'EMS Documentación dice «Hasta 20kg»', 'Dev dice «Hasta 20kg»; Figma y el AFU, «Hasta 2kg».', 'B', 'C',
     ('destino', [[11, 76.5, 35, 3], [7, 71.5, 20, 2.5]], False), ('17', [[10, 77, 30, 4], [6, 74.3, 20, 2.5]], False),
     '«Hasta 2kg.» (AFU HU-13) y «Disponibles según destino y peso declarado».', '«EMS Documentación … Hasta 20kg.» y «Disponible según destino y peso declarado».', None),
    ('DES-08', 'visuales', 'Destino', 'La representación ante Aduana tiene textos distintos', 'Dev dice «me representa»; Figma, «me represente».', 'B', 'C',
     ('com-destino', [[7, 85, 38, 4]], False), ('22', [[6, 77, 35, 3]], False),
     '«…me represente ante Aduana…».', '«…Correo Argentino me representa ante Aduana…».', 'Ver también «Falta la aclaración del cargo» (sin representación).'),
    ('DES-08b', 'visuales', 'Destino', 'Sin representación falta la aclaración del cargo', 'Figma aclara «Cargo adicional por gestionar sin representación»; dev sólo muestra un ícono ⓘ.', 'B', 'C',
     ('sin-repr', [[9, 29, 30, 18]], False), ('24', [[6, 62.5, 12, 4]], False),
     'Bajo el costo dice «Cargo adicional por gestionar sin representación de Correo Argentino» (AFU HU-14).', 'El costo lleva un ícono ⓘ.', 'Es parte del código DES-08 de la auditoría.'),
    ('DES-09', 'visuales', 'Destino', 'El modal de representación tiene el texto anterior', 'Dev usa el texto anterior y dice «Sin costo» en lugar de «Sin costo adicional».', 'M', 'C',
     ('modal-repr', [[5, 26, 90, 50], [60, 90, 21, 5]], True), ('29', [[35.5, 42, 30, 19], [53, 66, 8, 4]], False),
     'Explica la verificación física de Aduana y la representación (art. 80, ap. 1, Decreto 604/2026). Dice «Sin costo adicional».',
     '«…serás citado vos o un tercero en tu representación…». Bajo «Mantener representación» dice «Sin costo».', None),
    # --- Resumen
    ('RES-01', 'funcionales', 'Resumen', 'El Resumen no se completa al avanzar de paso', 'En Paquete y Origen dev sólo muestra la Declaración abierta; Figma suma y abre cada paso.', 'M', 'C',
     ('paquete', [[63, 57.5, 34, 14]], False), ('14', [[58.5, 57, 38.5, 5]], False),
     'Cada paso suma lo cargado y abre su sección (AFU §3).', 'En Paquete y en Origen sólo se ve la Declaración abierta. Paquete y Origen aparecen recién en Destino.', None),
    ('RES-02', 'funcionales', 'Resumen', 'Al Resumen le falta el peso aforado', 'Dev muestra «Medidas» y «Peso»; Figma también «Peso aforado».', 'M', 'C',
     ('paquete', [[63.5, 69, 34, 3]], False), ('16', [[58.5, 59, 38.5, 8]], False), 'También muestra «Peso aforado».', 'Paquete muestra «Medidas» y «Peso».', None),
    ('RES-03', 'visuales', 'Resumen', 'Los datos de Origen se muestran en filas', 'Dev pone rótulo y valor en la misma fila; Figma, rótulo arriba y valor abajo.', 'B', 'C',
     ('origen', [[63.5, 52, 34, 29]], False), ('16', [[58.5, 71.5, 38.5, 9.5]], False),
     'Rótulo arriba y valor abajo, para direcciones largas.', 'Rótulo a la izquierda y valor a la derecha.', None),
    ('RES-04', 'visuales', 'Resumen', 'Sin datos, muestra ceros en vez de guiones', 'Dev muestra «0», «USD 0,00» y «0 kg»; Figma, «-».', 'B', 'C',
     ('decl-vacia', [[7, 70, 45, 9]], False), ('01', [[6, 90, 45, 10]], False),
     '«-»; rótulos en gris (#474747).', '«0», «USD 0,00» y «0 kg»; rótulos en negro (#191919).', None),
    ('RES-05', 'visuales', 'Resumen', '«Detalle» tiene «Editar»', 'Dev muestra «Editar» en Detalle; Figma, sólo la flecha.', 'B', 'C',
     ('decl-vacia', [[63, 60, 34, 3.5]], False), ('01', [[58.5, 71.5, 38.5, 3.5]], False), 'Sólo la flecha.', 'Muestra «Editar» y flecha.', None),
    ('RES-06', 'visuales', 'Resumen', 'Los rubros del Detalle están en mayúscula', 'Dev dice «Servicio Postal» y «Servicio de Entrega».', 'B', 'C',
     ('destino', [[63.5, 78, 34, 8]], False), ('17', [[58.5, 62.5, 38.5, 7]], False), '«Servicio postal» y «Servicio de entrega».', '«Servicio Postal» y «Servicio de Entrega».', None),
    ('RES-07', 'visuales', 'Resumen', 'Con fines comerciales, la categoría aparece en el Resumen desde el inicio', 'Dev muestra «Venta de mercadería» apenas se activa el interruptor.', 'B', 'C',
     ('com-decl', [[63.5, 39, 34, 3]], False), ('26', [[58.5, 43, 38.5, 3]], False),
     'Muestra «-» hasta completar la declaración.', 'Al activar el interruptor, el Resumen ya muestra «Venta de mercadería».', None),
    ('RES-08', 'visuales', 'Resumen', 'Resumen › Destino tiene una fila «Servicio postal» de más', 'Dev suma «Servicio postal» en Destino; en Figma el servicio está sólo en Detalle.', 'B', 'C',
     ('destino', [[63.5, 65.5, 34, 8]], False), ('17', [[58.5, 54.5, 38.5, 3.5]], False),
     'No tiene la fila «Servicio postal» (el servicio se ve en Detalle).', 'Destino muestra País, Ciudad, Dirección y «Servicio postal».', None),
]

AMB = [
    ('AMB-01', 'La rueda del mouse cambia los valores numéricos', 'Con el foco en peso o precio, una vuelta de la rueda baja el valor un paso (0.3 → 0.29) sin que el usuario lo note.',
     ('28', [[35, 58.5, 29, 6]]), 'Con el foco en «Peso unitario (Kg)», una vuelta de la rueda baja el valor un paso (0.01): 0.3 pasa a 0.29, y se arrastra al artículo y a los totales. Pasa al desplazar el modal sin sacar el foco del campo. Afecta a precio y peso (campos type=number).'),
    ('AMB-02', 'El mapa de Origen no carga', 'OpenStreetMap bloquea los mosaicos del mapa.', ('15', [[27, 19, 27, 38]]), 'OpenStreetMap bloquea los mosaicos («Access blocked … tile usage policy»).'),
    ('AMB-03', 'Destino y el Resumen tienen datos de ejemplo', 'Destinatario, dirección, origen y resumen vienen precargados con datos de prueba.', ('16', [[6, 25, 36, 22]]),
     'Destinatario, dirección, origen y resumen vienen precargados (por ejemplo, «Logística ecuatorial»). El Resumen › Origen no refleja la sucursal elegida. Esos contenidos no se auditaron.'),
    ('AMB-04', 'La pestaña «Nacional» sale del ambiente', 'Lleva a otro dominio, el del flujo nacional anterior.', None,
     'Lleva a otro dominio, el del flujo nacional anterior. Por eso no se pudo probar el ida y vuelta Nacional → Internacional de DEC-01.'),
    ('AMB-05', 'VUCE devuelve «METRO CUADRADO» para remeras', 'Es la unidad de medida que devuelve el servicio para «T-shirts y camisetas».', ('09', [[34, 68.5, 33, 4]]),
     'Es la unidad de medida que devuelve para «T-shirts y camisetas» (Figma muestra lo mismo en su ejemplo). Conviene confirmarlo con el servicio.'),
    ('AMB-06', '«Guardar» se habilita con datos obligatorios vacíos', 'En Destino queda habilitado aunque Provincia, Ciudad y Código postal estén vacíos.', ('17', [[58.5, 80, 38.5, 4.5]]),
     'Figma no muestra el estado deshabilitado, pero el AFU (HU-12) los da como obligatorios: hay que verificar si «Guardar» valida al presionarlo (no se presionó).'),
    ('AMB-07', 'Las listas desplegables no se vieron abiertas', 'Las opciones existen y se pueden elegir con el teclado, pero no aparecieron en las capturas.', ('05', [[6, 54.5, 35, 5]]),
     'Revisarlo a mano: puede ser sólo un efecto de la captura.'),
]

items = []
for code, cat, group, title, summary, sev, est, fg, dv, ftxt, dtxt, extra in D:
    slug = code.lower()
    fscreen, fboxes, ffull = fg
    ffile, fnode = FIG[fscreen]
    fimg, fhl = crop_side(os.path.join(PANT, 'figma', ffile), fboxes, f'{slug}-figma', ffull, 'png')
    dcap, dboxes, dfull = dv
    dimg, dhl = crop_side(os.path.join(CAP, DEV[dcap]), dboxes, f'{slug}-dev', dfull, 'jpg')
    details = [f'Tipo: {"funcional" if cat == "funcionales" else "visual"}. Estado en la auditoría: {"confirmada" if est == "C" else "a confirmar"}.']
    if extra:
        details.append(extra)
    items.append({
        'id': slug, 'code': code.replace('b', ''), 'category': cat, 'group': group, 'title': title, 'summary': summary,
        'severity': SEV[sev], 'status': ST[est],
        'figma': {'kind': 'capture', 'image': fimg, 'caption': f'Mi Correo 2.0 · flujo v1.8 ({fnode})', 'highlights': fhl, 'sublabel': 'Mi Correo 2.0 · flujo'},
        'web': {'kind': 'pending', 'caption': 'Este flujo no se relevó en la landing de producción.'},
        'dev': {'kind': 'capture', 'image': dimg, 'caption': f'Captura {DEV[dcap].split("-")[0]}-{DEV[dcap].split("-")[1]} de la auditoría (10/11/2026)', 'highlights': dhl},
        'details': details,
        'values': [{'prop': 'Qué pasa', 'figma': ftxt, 'web': '—', 'dev': dtxt}],
        'sourceNote': SRC_NOTE,
        'sources': [],
    })

for code, title, summary, dv, detail in AMB:
    slug = code.lower()
    dev = {'kind': 'pending', 'caption': 'No hay captura de este problema.'}
    if dv:
        dimg, dhl = crop_side(os.path.join(CAP, DEV[dv[0]]), dv[1], f'{slug}-dev', False, 'jpg')
        dev = {'kind': 'capture', 'image': dimg, 'caption': f'Captura {DEV[dv[0]].split("-")[0]}-{DEV[dv[0]].split("-")[1]} de la auditoría', 'highlights': dhl}
    items.append({
        'id': slug, 'code': code, 'category': 'ambiente', 'group': 'Problemas de la web dev', 'title': title, 'summary': summary,
        'status': 'abierta',
        'figma': {'kind': 'na', 'caption': 'No es una diferencia con Figma: es un problema del ambiente.', 'sublabel': ''},
        'web': {'kind': 'pending', 'caption': 'No aplica a la landing de producción.'},
        'dev': dev,
        'details': [detail],
        'values': [],
        'sourceNote': SRC_NOTE,
        'sources': [],
    })

p = os.path.join(DIF, 'diferencias.json')
d = json.load(open(p, encoding='utf-8'))

# Duplicados de la pasada de hoy: pasan a llevar el código de la auditoría.
drop = {'mc2-declaracion-texto', 'mc2-navbar-menu'}
old = {i['id']: i for i in d['items']}
dec05 = dict(old['mc2-declaracion-texto'])
dec05.update({'id': 'dec-05', 'code': 'DEC-05', 'group': 'Declaración', 'title': 'La leyenda de la declaración (DESP) tiene un párrafo de más',
              'details': ['Tipo: visual. Estado en la auditoría: confirmada.', 'AFU HU-08: la frase se quitó y sigue abierta la consulta D7 sobre si va todo el descargo.'],
              'sourceNote': SRC_NOTE, 'sources': []})
gen01 = dict(old['mc2-navbar-menu'])
gen01.update({'id': 'gen-01', 'code': 'GEN-01', 'category': 'visuales', 'group': 'General', 'title': 'El menú de usuario dice «Mi cuenta»',
              'details': ['Tipo: visual. Estado en la auditoría: confirmada.', 'El nombre de la persona es de ejemplo en los dos lados.'],
              'sourceNote': SRC_NOTE, 'sources': []})
d['items'] = [i for i in d['items'] if i['id'] not in drop and i['category'] not in ('funcionales', 'ambiente')
              and not (i['category'] == 'visuales')]
d['items'] += [gen01, dec05] + items

# Orden de visuales: como la auditoría (por pantalla).
order = ['GEN', 'DEC', 'ART', 'PAQ', 'ORI', 'DES', 'RES', 'AMB']
def key(i):
    c = i.get('code', '')
    return (i['category'], order.index(c[:3]) if c[:3] in order else -1, c)
comp = [i for i in d['items'] if i['category'] == 'componentes']
rest = sorted([i for i in d['items'] if i['category'] != 'componentes'], key=key)
d['items'] = comp + rest

cats = {c['id']: c for c in d['categories']}
cats['componentes']['note'] = (
    'Relevado el 2026-11-04 en la landing de MiCorreo (producción) contra el Design System. El 2026-11-11 se sumaron capturas del entorno dev '
    '(/internacional) y su comparación con los componentes de Mi Correo 2.0. En dev coinciden con Mi Correo 2.0 el selector Nacional/Internacional y el stepper. '
    'El interruptor de fines comerciales está en la versión anterior (ver DEC-03 en Visuales).')
cats['visuales'].update({'status': 'relevado', 'note': 'Auditoría del flujo /internacional (dev) contra Figma Mi Correo 2.0, flujo v1.8: 06/11/2026, reverificada el 10/11/2026. Envío individual, con y sin fines comerciales, hasta «Guardar».'})
cats['funcionales'].update({'status': 'relevado', 'note': 'Misma auditoría del flujo /internacional (06/11, reverificada el 10/11). No se probaron Masivo, mobile ni lo que viene después de «Guardar».'})
if 'ambiente' not in cats:
    d['categories'].append({'id': 'ambiente', 'title': 'Ambiente', 'description': 'Problemas propios de la web dev. No son diferencias con Figma, pero afectan lo que se puede probar o declarar.',
                            'status': 'relevado', 'note': 'Detectados en la misma auditoría del flujo /internacional.'})
json.dump(d, open(p, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=2)
from collections import Counter
print(Counter(i['category'] for i in d['items']))
