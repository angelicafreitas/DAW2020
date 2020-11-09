<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">

    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Archeosites</title>
                </head>
                <body>
                    <h2>Archeosites' archives</h2>
                    <h3>Index </h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"></xsl:sort>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        
        <xsl:apply-templates select="//ARQELEM"/>
        
    </xsl:template>
    
    
    <!-- Templates de Índice.....................................-->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="http://localhost:7777/arqs/{count(preceding::ARQELEM)+1}">
                <xsl:value-of select="IDENTI"/>
            </a>                
        </li>
    </xsl:template> 
    

    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/arq{count(preceding::ARQELEM)+1}.html">
            <html>
                <head>
                    <title>Archeosite</title>
                </head>
                <body>
                    <center>
                        <h2> <xsl:value-of select="IDENTI"/></h2>                        
                    </center>
                    <dl>
                        <xsl:for-each select="*[name()!='TIPO' and name()!='IDENTI']">
                            <dt><b><xsl:value-of select="name()"/>:</b></dt>
                            <dd><xsl:apply-templates select="."></xsl:apply-templates></dd>
                        </xsl:for-each>
                    </dl>
                    
                    <address>
                        [<a href="index.html#i{generate-id()}">Go to index</a>]
                    </address>
                    
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>


</xsl:stylesheet>